export default class App {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;

        this.btnSubmit = document.getElementById('btnSubmit')
        this.name = document.getElementById('name')
        this.tbody = document.getElementById('tbody')
    }

    async initialize() {
        this.configureButton()
        return this.updateTableWithCharactersFromAPI()
    }

    configureButton() {
        this.btnSubmit.onclick = this.onButtonClick.bind(this)
    }

    updateTable(name) {
        this.tbody.innerHTML = `<tr><td>${name}</td></tr>`.concat(this.tbody.innerHTML)
    }

    cleanNameInput() {
        this.name.value = ''
    }
    isNameValid(name) {
        if (!name) {
            return false;
        }

        return true;

    }
    onButtonClick() {
        const name = this.name.value
        if (!this.isNameValid(name)) {
            window.alert('o nome é obrigatorio!')
            return;
        }
        this.updateTable(name)
        this.cleanNameInput()
    }

    async updateTableWithCharactersFromAPI() {
        const { results } = await (await fetch(this.apiUrl)).json()
        for (const { name } of results) {
            this.updateTable(name)
        }
    }
}

