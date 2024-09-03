import { useState } from "react";
import "./App.css";
import { CrossIcon } from "./components/icons/crossIcon";
import { TableComponent } from "./components/table/tableComponent";
import { Word } from "./types";

function App() {
    const [words, setWords] = useState<Word[]>([]);

    const cyrillicToLatinMap: { [key: string]: string } = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "j",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",
        З: "Z",
        И: "I",
        Й: "J",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "Kh",
        Ц: "Ts",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Shch",
        Ъ: "",
        Ы: "Y",
        Ь: "",
        Э: "E",
        Ю: "Yu",
        Я: "Ya",
    };

    const convertToTranslit = (origin: string): string => {
        return origin
            .split("")
            .map((char) => cyrillicToLatinMap[char] || char)
            .join("");
    };

    const handleAddWord = (e: any) => {
        e.preventDefault();
        const input = document.querySelector("#mainInput") as HTMLInputElement;
        if (input) {
            if (input.value != "") {
                const data = input.value;
                const convertedData = convertToTranslit(data);
                const word: Word = {
                    origin: data,
                    converted: convertedData,
                };
                setWords([...words, word]);
            }
        }
        input.value = "";
    };

    const handleDeleteAll = () => {
        setWords([]);
    };

    return (
        <div className={"content"}>
            <h1 className={"appName"}>T.R.A.N.S.L.I.T.</h1>
            <form onSubmit={handleAddWord} className={"mainInputContainer"}>
                <input
                    id="mainInput"
                    type="text"
                    className={"mainInput"}
                    placeholder="Начните вводить текст"
                />
                <button id="addButton" className={"mainInputBTN"} type="submit">
                    Добавить
                </button>
            </form>
            <TableComponent words={words} setWords={setWords} />
            <button className={"deleteAllBTN"} onClick={handleDeleteAll}>
                <CrossIcon />
                Очистить всё
            </button>
        </div>
    );
}

export default App;
