import { createBrowserRouter } from "react-router-dom";
import Counter from "../pages/home/counter/Counter";
import { Home } from "../pages/home/Home";
import ReverseString from "../pages/home/reverseString/ReverseString";
import Weather from "../pages/home/weather/Weather";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path:"/counter",
                element:(
                    <Counter/>
                ),
            },
            {
                path:"/reverse-string",
                element:(
                    <ReverseString/>
                ),
            },
            {
                path:"/weather",
                element:(
                    <Weather/>
                ),
            },
        ]
    }
])

export default routes;