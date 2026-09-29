# Summary of Changes and Root Cause Analysis

## Issue Reported
Making a GET request to:
```
http://localhost:3000/maps/get-auto-complete-suggestions?input=ga
```
resulted in:
```
Status code: 500 Internal Server Error
```

---

## Root Causes Identified

1. **Authentication Token Error Returning HTTP 500 Instead of 401 (`middleware.user.js`):**
   - The `authUser` middleware previously did:
     ```javascript
     const cookieToken = req.cookies.token;
     const bearerToken = req.headers.authorization?.split(' ')[1];
     const cookie = cookieToken || bearerToken;
     ```
   - If the browser had an expired or stale cookie named `token` from an earlier session, `authUser` prioritized that stale cookie over any valid Bearer token.
   - When `jwt.verify(cookie, process.env.JWT)` failed (throwing `TokenExpiredError` or `JsonWebTokenError`), the `catch` block returned **`500 Internal Server Error`** instead of **`401 Unauthorized`**.

2. **Missing `Authorization` Header in Frontend (`Home.jsx`):**
   - The user's JWT token is stored in `localStorage` upon login.
   - In `Home.jsx`, `getSuggestions` called `axios.get` with only `{ params: { input }, withCredentials: true }`, omitting the `Authorization: Bearer <token>` header entirely.
   - Because cookies set with `secure: true` / cross-origin restrictions on `http://localhost` are often blocked or stale, the request failed authentication.

3. **Backend Validation Mismatch on Input Length (`maps.routes.js`):**
   - `maps.routes.js` validated `input` with `.isLength({ min: 3 })`.
   - `Home.jsx` triggered suggestions when `input.trim().length >= 2` (such as `"ga"`).
   - Even when authenticated, `"ga"` was rejected with `400 Bad Request` ("Invalid value") because it had only 2 characters.

4. **Unhandled `ZERO_RESULTS` from Google Places API (`maps.service.js`):**
   - If Google Places Autocomplete API returned `{ status: "ZERO_RESULTS", predictions: [] }`, the service threw an unhandled error because it only checked for `status === "OK"`.

5. **Potential Frontend Crash on Non-Array Suggestions (`LocationSearchPanel.jsx`):**
   - Directly calling `props.suggestions.map(...)` without verifying that `suggestions` is an array risked runtime crashes if the response was empty or undefined.

---

## Changes Made and Why

### 1. `backend/src/middlewares/middleware.user.js`
- **What changed:**
  - Used optional chaining `req.cookies?.token` to prevent `TypeError` if `req.cookies` is undefined.
  - Prioritized the explicit `Authorization` header (`bearerToken || cookieToken`) over ambient cookies.
  - Added specific handling for JWT errors (`JsonWebTokenError` and `TokenExpiredError`) to return HTTP **`401 Unauthorized`** instead of **`500 Internal Server Error`**.
- **Why:**
  - Prevents expired/stale cookies from overriding a valid Bearer token.
  - Conforms to standard HTTP status codes: authentication issues must return 401, not 500.

### 2. `frontend/src/pages/Home.jsx`
- **What changed:**
  - Added `Authorization: Bearer ${localStorage.getItem('token')}` header to the `getSuggestions` API request:
    ```javascript
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-auto-complete-suggestions`,
        {
            params: { input },
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    );
    ```
- **Why:**
  - Ensures the user's active session token from `localStorage` is sent to the backend, aligning with other authenticated endpoints in the app.

### 3. `backend/src/routes/maps.routes.js`
- **What changed:**
  - Adjusted minimum length validation for `input` from `min: 3` to `min: 1`:
    ```javascript
    router.get('/get-auto-complete-suggestions',
        query('input').isString().isLength({ min: 1 }),
        authUser,
        getAutoCompleteSuggestions
    );
    ```
- **Why:**
  - Google Places API supports short queries (like `"ga"`), and the frontend sends requests starting from 2 characters. This prevents 400 validation errors for 2-letter queries.

### 4. `backend/src/services/maps.service.js`
- **What changed:**
  - Added explicit handling for `status === "ZERO_RESULTS"`:
    ```javascript
    if (response.data.status === "ZERO_RESULTS") {
        return [];
    }
    ```
- **Why:**
  - Returns an empty array gracefully when no suggestions match the search term rather than throwing an error and returning a 404/500 response.

### 5. `frontend/src/components/LocationSearchPanel.jsx`
- **What changed:**
  - Added an array check before mapping:
    ```javascript
    {Array.isArray(props.suggestions) && props.suggestions.map((item, index) => { ... })}
    ```
- **Why:**
  - Prevents the UI from crashing if `suggestions` is not yet loaded or not an array.
