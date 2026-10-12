import React, { forwardRef } from "react";

const LocationText = forwardRef(({ text, isOpen, onToggle }, ref) => {

    if (!text) return null;

    const isLong = text.length > 45;

    return (
        <div ref={ref} className="relative group">

            <p
                className="text-sm text-gray-600 mt-1 cursor-pointer"
                onClick={onToggle}
            >
                <i className="ri-map-pin-line mr-1"></i>

                {isLong
                    ? `${text.slice(0, 45)}...`
                    : text}
            </p>

            {isLong && (
                <div
                    className={`
                        absolute
                        left-0
                        bottom-full
                        mb-2
                        z-50
                        w-[min(350px,calc(100vw-40px))]
                        bg-gray-900
                        text-white
                        text-sm
                        leading-relaxed
                        px-3
                        py-2
                        rounded-lg
                        shadow-xl
                        break-words

                        transition-all
                        duration-200

                        ${isOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible translate-y-1"
                        }

                        md:group-hover:opacity-100
                        md:group-hover:visible
                        md:group-hover:translate-y-0
                    `}
                >
                    {text}

                    {/* Arrow */}
                    <div
                        className="
                            absolute
                            left-5
                            top-full
                            w-0
                            h-0
                            border-l-[6px]
                            border-l-transparent
                            border-r-[6px]
                            border-r-transparent
                            border-t-[6px]
                            border-t-gray-900
                        "
                    />
                </div>
            )}

        </div>
    );
});

export default LocationText;