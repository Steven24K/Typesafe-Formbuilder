import React from 'react'
import '../static/css/site.css'
import JSONPretty from 'react-json-pretty'
import { Func } from '../lib/utils/Func'
import { Query } from '../lib/LazyFormBuilder'
import { FormBuilder } from '../lib/FormBuilder'
import FormMaster from '../lib/components/FormMaster'
import { DropDownOptions } from '../lib/utils/DropdownOptions'
import { Pair } from '../lib/utils/Pair'


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
                favoriteColor: 'black',
                terms: false,
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
        return <div className='App' style={{ backgroundColor: this.state.customer.favoriteColor, color: FormBuilder.Entity(this.state.immutuableCustomer, this.state.formQuery).data[0].favoriteColor }}>

            <div className='row'>

                <div className='col-4'>

                    <h1>My automatic formbuilder</h1>

                    <button onClick={() => this.setState({
                        ...this.state,
                        customer: {
                            ...this.state.customer,
                            products: this.state.customer.products.concat({ productName: '', price: 0 })
                        }
                    })}>
                        Add Product
                    </button>

                    <button onClick={() => this.setState({
                        ...this.state,
                        customer: {
                            ...this.state.customer,
                            lists: this.state.customer.lists.concat([[]])
                        }
                    })}>
                        Add list
                    </button>

                    <FormMaster<Customer> id_prefix='my-form'
                        defaultData={[this.state.customer]} 
                        query={Func(q => q.Select('FirstName', 'LastName', 'birthDay', 'gender', 'terms')
                            .Select('favoriteColor')
                            .Select('lists', 'todo')
                            .Children('products', Func(q => q.Select('productName')))
                            .AssignAny('gender', new DropDownOptions('male', [Pair('M', 'male'), Pair('V', 'female')]))
                        )}
                        onChange={(key, newValue, index) => {
                            console.log(`Edited ${key}:${index} to ${newValue}`)
                            this.setState({ ...this.state, customer: { ...this.state.customer, [key]: newValue } })
                        }}
                    />

                </div>

                <div className='col-2'>

                    <JSONPretty data={JSON.stringify(this.state.customer)} />

                </div>

            </div>

            <div className='row'>

                <div className='col-4'>
                    <h1>Immutuable form data</h1>
                    <p>The state never changes</p>

                    <FormMaster id_prefix='my-form-Immutuable'
                        defaultData={FormBuilder.Entity(this.state.immutuableCustomer, this.state.formQuery).data}
                        query={this.state.formQuery}
                        onChange={(key, newValue, index) => {
                            console.log(`Edited ${key}:${index} to ${newValue}`)
                            this.setState({ ...this.state, formQuery: this.state.formQuery.then(Func(q => q.Assign(key, newValue))) })
                        }}
                    />

                </div>

                <div className='col-2'>
                    <JSONPretty data={JSON.stringify(FormBuilder.Entity(this.state.immutuableCustomer, this.state.formQuery).data)} />
                </div>

            </div>

        </div>
    }
}