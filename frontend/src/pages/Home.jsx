import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <div className="w-full h-screen 
            bg-[url('https://images.unsplash.com/photo-1587307293162-2fb7a3ebfc75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D')] bg-[position:left_-70px]
            flex flex-col md:flex-row md:justify-between justify-between  gap-4">

                <div className="p-4">
                    <img src="https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg" alt="" />
                </div>

                <div className="bg-white w-full md:w-1/2 py-6 px-4 flex flex-col justify-center items-center gap-7">
                    <h1 className="md:text-4xl text-3xl font-bold">Get started with Uber</h1>

                    <Link to="/login" className='bg-black p-2 md:w-52 w-full flex items-center justify-center text-white rounded-md font-semibold'>Continue</Link>

                </div>
            </div>

        </div>

    )
}

export default Home