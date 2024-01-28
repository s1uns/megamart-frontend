import React, {
    useState,
    useRef,
    useCallback,
    FC,
    ChangeEvent,
    MouseEvent,
} from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

export const Search: FC = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const onClear = () => {
        dispatch(setSearchValue(""));
        setValue("");
        inputRef.current?.focus();
    };

    const updateSearchInput = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 300),
        []
    );

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchInput(event.target.value);
    };
    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                >
                    <path
                        d="M2028 4899 c-396 -31 -796 -194 -1103 -451 -897 -749 -959 -2094
                        -135 -2918 598 -598 1505 -751 2265 -380 282 138 537 349 721 600 499 677 521
                        1583 55 2276 -344 514 -883 827 -1501 874 -147 11 -147 11 -302 -1z m422 -684
                        c464 -101 832 -435 975 -886 75 -240 73 -538 -6 -780 -146 -451 -514 -776
                        -989 -875 -105 -22 -350 -25 -460 -5 -266 47 -501 171 -695 364 -250 250 -377
                        555 -378 907 -1 270 68 502 214 725 58 87 201 241 284 305 169 131 391 225
                        611 260 86 13 355 4 444 -15z"
                    />
                    <path
                        d="M1637 3612 c-9 -10 -17 -29 -17 -43 0 -16 66 -112 191 -279 106 -140
                        196 -262 202 -271 8 -12 2 -27 -24 -62 -19 -25 -37 -46 -40 -47 -3 0 -101 141
                        -219 313 -117 171 -229 331 -247 355 -38 46 -69 54 -96 24 -15 -17 -17 -79
                        -17 -680 l0 -661 26 -20 c40 -31 142 -30 172 2 21 23 22 29 24 390 l3 367 220
                        -322 c121 -178 233 -337 248 -355 34 -38 91 -58 140 -49 53 10 100 68 332 408
                        l210 308 3 -364 2 -365 26 -20 c40 -32 152 -30 182 2 l22 23 0 661 c0 627 -1
                        661 -18 676 -27 25 -67 21 -89 -7 -10 -14 -119 -173 -243 -355 -124 -182 -228
                        -331 -231 -331 -8 0 -72 87 -70 97 1 4 92 128 201 274 207 275 220 298 181
                        333 -15 14 -36 16 -117 14 l-99 -3 -83 -110 c-46 -60 -118 -156 -161 -212
                        l-77 -101 -160 211 -159 212 -101 3 c-87 2 -102 0 -117 -16z m364 -263 c134
                        -180 175 -228 183 -217 6 7 85 111 175 231 l163 217 85 0 85 0 -24 -32 c-13
                        -18 -108 -144 -211 -280 -103 -136 -188 -253 -189 -258 -3 -11 122 -188 132
                        -189 3 -1 120 168 260 374 140 206 258 374 263 375 4 0 6 -291 5 -647 l-3
                        -648 -60 0 -60 0 -5 439 -5 438 -214 -313 c-325 -476 -340 -496 -371 -509 -16
                        -7 -42 -9 -60 -5 -38 8 -37 7 -355 472 l-240 352 -6 -437 c-3 -240 -7 -438 -7
                        -440 -1 -2 -28 -2 -59 0 l-58 3 -3 650 c-2 554 0 647 12 635 7 -8 118 -168
                        246 -355 128 -187 241 -350 250 -363 l18 -22 70 92 c41 54 68 97 63 103 -93
                        120 -403 540 -408 550 -4 12 9 15 75 15 l80 0 173 -231z"
                    />
                    <path
                        d="M2100 2794 l-72 -96 68 -100 c37 -54 71 -101 75 -103 4 -3 39 42 79
                        100 l71 105 -67 88 c-37 48 -71 91 -74 95 -4 4 -40 -36 -80 -89z m118 -156
                        c-23 -32 -42 -58 -44 -58 -6 0 -77 106 -77 115 0 6 17 34 38 62 l38 52 43 -57
                        42 -56 -40 -58z"
                    />
                    <path
                        d="M3871 1521 c-88 -107 -212 -229 -311 -307 -33 -26 -60 -50 -60 -53 0
                        -4 206 -212 458 -463 431 -429 460 -457 512 -474 162 -53 335 16 407 164 24
                        49 28 69 28 142 0 144 15 126 -498 638 l-453 453 -83 -100z"
                    />
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={(event) => onChangeInput(event)}
                className={styles.input}
                placeholder="Enter the good..."
            />
            {value && (
                <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.clear}
                    onClick={onClear}
                >
                    <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </div>
    );
};

