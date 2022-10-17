function RandNumb() {
    return 1 + Math.floor(Math.random() * 11 + 1);
}

async function users_table() {
    let table = document.getElementsByClassName("table_item");
    try {
        let fetch_data = await (await fetch(`https://jsonplaceholder.typicode.com/users?id=${RandNumb()}&id=${RandNumb()}&id=${RandNumb()}`)).json();
        for (let i = 1; i < table.length / 4; i++) {
            if (i <= fetch_data.length) {
                table[i * 4].innerHTML = fetch_data[i - 1].id;
                table[i * 4 + 1].innerHTML = fetch_data[i - 1].name;
                table[i * 4 + 2].innerHTML = fetch_data[i - 1].phone;
                table[i * 4 + 3].innerHTML = fetch_data[i - 1].email;
            } else {
                table[i * 4].innerHTML = "⚠ ошибка";
                table[i * 4 + 1].innerHTML = "⚠ ошибка";
                table[i * 4 + 2].innerHTML = "⚠ ошибка";
                table[i * 4 + 3].innerHTML = "⚠ ошибка";
            }
        }
    } catch (e) {
        alert("Ошибка получения json данных\n\n" + e);
        for (let i = 1; i < table.length / 4; i++) {
            table[i * 4].innerHTML = "⚠ ошибка";
            table[i * 4 + 1].innerHTML = "⚠ ошибка";
            table[i * 4 + 2].innerHTML = "⚠ ошибка";
            table[i * 4 + 3].innerHTML = "⚠ ошибка";
        }
    } finally {
        document.querySelectorAll('#myElement')[0].style.display = 'none';
        document.querySelectorAll('.block_table')[0].style.display = 'block';
    }
}

window.addEventListener("load", () => {
    setTimeout(users_table, 2000);
});