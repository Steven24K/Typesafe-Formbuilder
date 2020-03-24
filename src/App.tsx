import React from 'react'
import '../static/css/site.css'
import FormPicker from './components/FormPicker'
import { FormBuilder } from '../lib/FormBuilder'
import { Func } from '../lib/Func'
import { DropDownOptions } from '../lib/DropdownOptions'
import { Pair } from '../lib/Pair'
import JSONPretty from 'react-json-pretty'
import { Query } from '../lib/LazyFormBuilder'

interface Product {
    productName: string
    price: number
}

interface Customer {
    FirstName: string
    LastName: string
    birthDay: Date
    gender: 'male' | 'female'
    favoriteColor: string
    terms: boolean

    todo: string[]
    products: Product[]
    lists: string[][]

}

type AppState = { customer: Customer, immutuableCustomer: Customer, formQuery: Query<Customer, any, any> }
type AppProps = {}
export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            customer: {
                FirstName: '',
                LastName: '',
                birthDay: new Date(),
                gender: 'female',
                favoriteColor: 'white',
                terms: true, //To make it checked on default
                lists: [[], [], []],
                products: [{ productName: 'TV', price: 400 }, { productName: 'car', price: 50000 }, { productName: 'plant', price: 50 }],
                todo: []
            },
            immutuableCustomer: {
                FirstName: '',
                LastName: '',
                birthDay: new Date(),
                gender: 'female',
                favoriteColor: 'white',
                terms: true, //To make it checked on default
                lists: [[], [], []],
                products: [{ productName: 'TV', price: 400 }, { productName: 'car', price: 50000 }, { productName: 'plant', price: 50 }],
                todo: []
            },
            formQuery: Func(q => q.Select('FirstName', 'LastName', 'birthDay', 'favoriteColor', 'terms')
                .Select('lists', 'todo')
                .Children('products', Func(q => q.Select('productName')))
            )
        }
    }

    render() {
        return <div className='App' style={{ backgroundColor: this.state.customer.favoriteColor }}>
            <h1>My automatic form</h1>

            <FormPicker id_prefix='my-form'
                defaultData={[this.state.customer]}
                fields={FormBuilder.Entity(this.state.customer,
                    Func(q => q.Select('FirstName', 'LastName', 'birthDay', 'gender', 'terms')
                        .Select('favoriteColor')
                        .Select('lists', 'todo')
                        .Children('products', Func(q => q.Select('productName')))
                        .AssignAny('gender', new DropDownOptions('male', [Pair('M', 'male'), Pair('V', 'female')]))
                    )).getFields()}
                onChange={(key, newValue, index) => {
                    console.log(`Edited ${key}:${index} to ${newValue}`)
                    this.setState({ ...this.state, customer: { ...this.state.customer, [key]: newValue } })
                }}
            />

            <JSONPretty data={JSON.stringify(this.state.customer)} />

            <h1>Immutuable form data</h1>
            <p>The state never changes</p>
            <FormPicker id_prefix='my-form'
                defaultData={FormBuilder.Entity(this.state.immutuableCustomer, this.state.formQuery).data}
                fields={FormBuilder.Entity(this.state.customer, this.state.formQuery).getFields()}
                onChange={(key, newValue, index) => {
                    console.log(`Edited ${key}:${index} to ${newValue}`)
                    this.setState({ ...this.state, formQuery: this.state.formQuery.then(Func(q => q.Assign(key, newValue))) })
                }}
            />

            <JSONPretty data={JSON.stringify(FormBuilder.Entity(this.state.immutuableCustomer, this.state.formQuery).data)} />

        </div>
    }
}