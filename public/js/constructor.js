function MyForm() {
    this.arrDays = [];

    this.DOM = {
        arrDays: null,
        settingsForm: null
    };

    this.settings = {
        needToDo: 1,
        countDays: 6
    };

    this.load();
    this.getDOM();
    this.createDOM();
    this.IsDisable();
}

window.addEventListener("load", () => {
    new MyForm();
})

MyForm.prototype.getDOM = function () {
    let handler = event => {
        event.preventDefault();
        this.settings.needToDo = parseInt(this.DOM.settingsForm.querySelector('select[name="amount-subjects"]').value);
        this.settings.countDays = parseInt(this.DOM.settingsForm.querySelector('select[name="amount-day"]').value);
        this.arrDays = new Array(this.settings.countDays).fill(0).map(_ => []);
        this.save();
        this.createDOM();
    }
    this.DOM.arrDays = document.querySelector(".week");
    this.DOM.settingsForm = document.querySelector("#settings");
    this.DOM.settingsForm.addEventListener("submit", handler);
};

MyForm.prototype.createDOM = function () {
    this.DOM.settingsForm.querySelector('select[name="amount-subjects"]').value = this.settings.needToDo;
    this.DOM.settingsForm.querySelector('select[name="amount-day"]').value = this.settings.countDays;
    this.DOM.arrDays.innerHTML = "";
    this.arrDays.forEach((dayItem, index) => {
        let day = document.createElement("div");
        day.className = 'day';
        day.innerHTML = `
            <div class="day-name">
                ${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][index]}
            </div>
            <form data-day="${index}">
                <input placeholder="Текст задания" type="text" name="text">
            </form>
            <div class="day-list">
                
            </div>
        `;
        dayItem.forEach((actionItem, index) => {
            day.querySelector(".day-list").appendChild(this.createActionNode(index, actionItem));
        });
        day.querySelector("form").addEventListener("submit", this.add.bind(this));
        this.DOM.arrDays.appendChild(day);
    });
};

MyForm.prototype.createActionNode = function (index, content) {
    let action = document.createElement("div");
    action.className = "day-item";
    action.innerHTML = `
        <div class="day-item__index">   </div>
        <div class="day-item__content"></div>
    `;
    action.querySelector('.day-item__index').appendChild(document.createTextNode(++index));
    action.querySelector('.day-item__content').appendChild(document.createTextNode(content));
    return action;
}

MyForm.prototype.load = function () {
    this.settings = JSON.parse(localStorage.getItem('settings')) || this.settings;
    this.arrDays = JSON.parse(localStorage.getItem('week')) || this.arrDays;
};

MyForm.prototype.save = function () {
    localStorage.setItem('settings', JSON.stringify(this.settings));
    localStorage.setItem('week', JSON.stringify(this.arrDays));
};

MyForm.prototype.add = function (event) {
    event.preventDefault();
    let day = parseInt(event.target.dataset.day);
    let text = event.target.querySelector("input").value;
    if (text.replace(/ /g, '') === '') {
        return;
    }
    this.arrDays[day].push(text);
    this.DOM.arrDays.querySelectorAll('.day')[day].appendChild(this.createActionNode(this.arrDays[day].length - 1, text));
    this.IsDisable();
    this.save();
    event.target.querySelector('input').value = "";
    event.target.querySelector('input').blur();
};

MyForm.prototype.IsDisable = function () {
    this.arrDays.forEach((weekItem, index) => {
        if (weekItem.length === this.settings.needToDo) {
            this.DOM.arrDays.querySelectorAll('.day')[index].querySelector('input').disabled = true;
        }
    });
};