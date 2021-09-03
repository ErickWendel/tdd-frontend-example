import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
} from '@jest/globals'
import App from '../src/app.js'

describe('#App', () => {
    const elementObj = { innerHTML: '', value: '', onclick: jest.fn() }
    beforeEach(() => {
        jest.spyOn(document, document.getElementById.name).mockReturnValue(elementObj)
    })
    
    describe('#isNameValid should validate if name has value', () => {
        test('given an empty name it should return false', () => {
            const appInstance = new App({})
            const result = appInstance.isNameValid('')
            expect(result).toBeFalsy()
        })

        test('given an valid name it should return false', () => {
            const appInstance = new App({})
            const result = appInstance.isNameValid('Erick Wendel')
            expect(result).toBeTruthy()
        })
    })

    test('#update table should add new lines on top of to tBody elements HTML', () => {
        const appInstance = new App({})

        appInstance.updateTable('ErickWendel')
        appInstance.updateTable('Zézin')

        const expected = `
        <tr>
            <td>Zézin</td>
        </tr>
        <tr>
            <td>ErickWendel</td>
        </tr>
        `.replace(/\s/g, '') // remove os espaços, só para facilitar ver melhor aqui o html aqui no teste

        // repare que o zézin foi inserido por ultimo, na nossa logica, o ultimo sempre fica em primeiro
        // por isso ele está em primeiro
        expect(appInstance.tbody.innerHTML).toEqual(expected)
    })
    test('#cleanNameInput should cleanup name element value', () => {
        const appInstance = new App({})
        appInstance.name.value = "Erick Wendel"
        appInstance.cleanNameInput()
        expect(appInstance.name.value).toEqual("")
    })
    describe('#onButtonClick', () => {

        test('#onButtonClick should call updateTable and cleanNameInput if name is valid', () => {
            const appInstance = new App({})
            jest.spyOn(appInstance, appInstance.updateTable.name).mockImplementation(() => { })
            jest.spyOn(appInstance, appInstance.cleanNameInput.name).mockImplementation(() => { })


            appInstance.name.value = 'Erick Wendel'
            appInstance.onButtonClick()

            expect(appInstance.updateTable).toHaveBeenCalled()
            expect(appInstance.cleanNameInput).toHaveBeenCalled()
        })

        test('#onButtonClick should show alert message if name is invalid', () => {
            const appInstance = new App({})

            jest.spyOn(window, "alert").mockImplementation(() => { })
            jest.spyOn(appInstance, appInstance.updateTable.name).mockImplementation(() => { })
            jest.spyOn(appInstance, appInstance.cleanNameInput.name).mockImplementation(() => { })


            appInstance.name.value = ''
            appInstance.onButtonClick()

            expect(appInstance.updateTable).not.toHaveBeenCalled()
            expect(appInstance.cleanNameInput).not.toHaveBeenCalled()
            expect(window.alert).toHaveBeenCalledWith('o nome é obrigatorio!')

        })

    })

    test('#configureButton should assingn onButtonClick function for its onclick function', () => {
        const appInstance = new App({})
        jest.spyOn(appInstance, appInstance.onButtonClick.name).mockReturnValue()

        appInstance.btnSubmit.onclick()
        expect(appInstance.onButtonClick).not.toHaveBeenCalled()

        appInstance.configureButton()
        appInstance.btnSubmit.onclick()

        expect(appInstance.onButtonClick).toHaveBeenCalled()
    })


    test('#updateTableWithCharactersFromAPI should show get only names from results', async () => {
        const apiUrl = 'https://hello-test-api.com'
        const appInstance = new App({ apiUrl })
        jest.spyOn(appInstance, appInstance.updateTable.name).mockReturnValue()

        const mockAPIResponse = {
            "info": {
                "count": 671,
                "pages": 34,
                "next": "https://rickandmortyapi.com/api/character?page=2",
                "prev": null
            },
            "results": [{
                "id": 1,
                "name": "Rick Sanchez",
                "status": "Alive",
                "species": "Human",
                "type": "",
                "gender": "Male",
                "origin": {
                    "name": "Earth (C-137)",
                    "url": "https://rickandmortyapi.com/api/location/1"
                },
                "location": {
                    "name": "Earth (Replacement Dimension)",
                    "url": "https://rickandmortyapi.com/api/location/20"
                },
                "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                "episode": ["https://rickandmortyapi.com/api/episode/1"],
                "url": "https://rickandmortyapi.com/api/character/1",
                "created": "2017-11-04T18:48:46.250Z"
            }]
        }

        global.fetch = jest.fn()
            .mockResolvedValue({ json: async () => mockAPIResponse });

        await appInstance.updateTableWithCharactersFromAPI()
        
        expect(global.fetch).toHaveBeenCalledWith(apiUrl)
        expect(appInstance.updateTable).toHaveBeenCalledWith("Rick Sanchez")
    })

    test('#initialize should call configureButton and updateTableWithCharactersFromAPI', async () => {
        const appInstance = new App({})
        jest.spyOn(appInstance, appInstance.updateTableWithCharactersFromAPI.name).mockResolvedValue()
        jest.spyOn(appInstance, appInstance.configureButton.name).mockResolvedValue()

        await appInstance.initialize()

        expect(appInstance.configureButton).toHaveBeenCalled()
        expect(appInstance.updateTableWithCharactersFromAPI).toHaveBeenCalled()

    })
})