import { useEffect, useState } from "react";
import { Word } from "../../types";
import { CrossIcon } from "../icons/crossIcon";
import styles from "./styles.module.css";

interface ITableComponent {
    setWords: (words: Word[]) => void;
    words: Word[];
}

export const TableComponent = ({ words, setWords }: ITableComponent) => {
    const [isMobile, setIsMobile] = useState(false);

    const handleDelItem = (index: number) => {
        setWords(words.filter((_word, i) => i !== index));
    };

    const drawTable = () => {
        const table = words.map((word, index) => {
            return (
                <li key={index} className={styles.item}>
                    <div id={`light${index}`} className={styles.lightContainer}>
                        <span className={styles.iterator}>{index + 2}</span>
                        <span
                            id={`${index}`}
                            className={styles.originalText}
                            ref={(el) => {
                                if (el) {
                                    const textWidth = el.scrollWidth;
                                    const containerWidth = el.offsetWidth;
                                    if (textWidth > containerWidth) {
                                        const container =
                                            document.getElementById(
                                                `light${index}`
                                            );
                                        container?.classList.add(
                                            styles.showTooltip
                                        );
                                    } else {
                                        const container =
                                            document.getElementById(
                                                `light${index}`
                                            );
                                        container?.classList.remove(
                                            styles.showTooltip
                                        );
                                    }
                                }
                            }}
                        >
                            {word.origin}
                        </span>
                        <div className={`${styles.tooltip1}`}>
                            {word.origin}
                        </div>
                    </div>
                    <div id={`dark${index}`} className={styles.darkContainer}>
                        <span
                            className={styles.convertedText}
                            ref={(el) => {
                                if (el) {
                                    const textWidth = el.scrollWidth;
                                    const containerWidth = el.offsetWidth;
                                    if (textWidth > containerWidth) {
                                        const container =
                                            document.getElementById(
                                                `dark${index}`
                                            );
                                        container?.classList.add(
                                            styles.showTooltip
                                        );
                                    } else {
                                        const container =
                                            document.getElementById(
                                                `dark${index}`
                                            );
                                        container?.classList.remove(
                                            styles.showTooltip
                                        );
                                    }
                                }
                            }}
                        >
                            {word.converted}
                        </span>
                        <div className={`${styles.tooltip2}`}>
                            {word.converted}
                        </div>
                        <button
                            onClick={() => {
                                handleDelItem(index);
                            }}
                            className={styles.delBtn}
                        >
                            <CrossIcon />
                        </button>
                    </div>
                </li>
            );
        });
        return table;
    };

    const tryMobile = () => {
        const mobile = window.matchMedia("(max-width: 730px)");
        if (mobile.matches) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", tryMobile);
        return () => window.removeEventListener("resize", tryMobile);
    }, [tryMobile]);

    useEffect(() => {
        console.log("updated");
    });

    return (
        <>
            {!isMobile && (
                <ul id="table" className={styles.container}>
                    <li className={styles.item}>
                        <div
                            className={
                                styles.lightContainer + " " + styles.showTooltip
                            }
                        >
                            <span className={styles.iterator}>1</span>
                            <span className={styles.originalText}>
                                Привет 👋🏻 Мир Тук-тук Нео Калькул…
                            </span>
                            <div className={styles.tooltip1}>
                                Привет 👋🏻 Мир Тук-тук Нео Калькул…
                            </div>
                        </div>
                        <div
                            className={
                                styles.darkContainer + " " + styles.showTooltip
                            }
                        >
                            <span className={styles.convertedText}>
                                Privet Mir Tuk-tuk Neo Kalkuly…
                            </span>
                            <div className={styles.tooltip2}>
                                Privet Mir Tuk-tuk Neo Kalkuly…
                            </div>
                            <button className={styles.delBtn}>
                                <CrossIcon />
                            </button>
                        </div>
                    </li>

                    {drawTable()}
                </ul>
            )}
            {isMobile && (
                <div className={styles.mobileVer}>
                    <ul className={styles.mobileTableOriginal}>
                        <li className={styles.item}>
                            <div className={styles.lightContainer}>
                                <p className={styles.iterator}>1</p>
                                <p className={styles.originalText}>
                                    Привет 👋🏻 Мир Тук-тук Нео Калькул…
                                </p>
                                <button className={styles.delBtn}>
                                    <CrossIcon />
                                </button>
                            </div>
                        </li>
                        {words.map((word, index) => {
                            return (
                                <li key={index} className={styles.item}>
                                    <div className={styles.lightContainer}>
                                        <p className={styles.iterator}>
                                            {index + 2}
                                        </p>
                                        <p className={styles.originalText}>
                                            {word.origin}
                                        </p>
                                        <button
                                            onClick={() => {
                                                handleDelItem(index);
                                            }}
                                            className={styles.delBtn}
                                        >
                                            <CrossIcon />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className={styles.mobileTableConverted}>
                        <li className={styles.item}>
                            <div className={styles.darkContainer}>
                                <p className={styles.iterator}>1</p>
                                <p className={styles.originalText}>
                                    Privet Mir Tuk-tuk Neo Kalkuly…
                                </p>
                                <button className={styles.delBtn}>
                                    <CrossIcon />
                                </button>
                            </div>
                        </li>
                        {words.map((word, index) => {
                            return (
                                <li key={index} className={styles.item}>
                                    <div className={styles.darkContainer}>
                                        <p className={styles.iterator}>
                                            {index + 2}
                                        </p>
                                        <p className={styles.originalText}>
                                            {word.converted}
                                        </p>
                                        <button
                                            onClick={() => {
                                                handleDelItem(index);
                                            }}
                                            className={styles.delBtn}
                                        >
                                            <CrossIcon />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};
