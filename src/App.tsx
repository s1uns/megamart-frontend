import "./scss/app.scss";
import { lazy, Suspense } from "react";
import { Header } from "./components";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import GoodSkeleton from "./pages/GoodSkeleton";
import { CartEmpty } from "./components";
import { SellerPublicProfile } from "./components/SellerPublicProfile";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const FullGood = lazy(
    () => import(/* webpackChunkName: "FullGood" */ "./pages/FullGood")
);
const NotFound = lazy(
    () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/cart"
                        element={
                            <Suspense fallback={<CartEmpty />}>
                                <Cart />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/goods/:id"
                        element={
                            <Suspense fallback={<GoodSkeleton />}>
                                <FullGood />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/Profile/sellers/:id"
                        element={
                            <Suspense fallback={<GoodSkeleton />}>
                                <SellerPublicProfile />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense>
                                <NotFound />
                            </Suspense>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
