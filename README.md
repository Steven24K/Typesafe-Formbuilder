# Typesafe Formbuilder

This is a full blown typesafe Formbuilder framework for React. It consist of one main component called `FormMaster` and a LINQ query builder to select fields needed for your form.
This formbuilder allows you to create a form based on the datamodel of a certain entity. 

[demo](https://stevenkoerts.nl/Typesafe-Formbuilder/)

## Motivation 

Building forms in HTML can be quite boring and repetitive. So for automating this process I build this FormBuilder. The LINQ query builder is based on a schoolproject of mine which is to build a Type Safe LINQ framework. [repo](https://github.com/Steven24K/Type-Safe-LINQ). The queries you can build form a pipeline of executable functions, that modify your datastructure and generate some form fields. 

## Usage 

After you have installed you can create an object or interface containing the data you need: 

```
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
```

Then you can create a form using the `FormMaster` component: 

```
                    <FormMaster<Customer> id_prefix='my-form'
                        defaultData={[this.state.customer]} // A default object is stored in the state, the default values are being red from this object. It should always be an array
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
```

Since we are using React updating the form goes through the onChange handler with the formBuilder there are two ways of updating the form data. The first one is by just changing the object, the second one is by 
storing the query in the state and add a `Assign` function to the pipeline in the onChange method. The full demo component can be found [here](https://github.com/Steven24K/Typesafe-Formbuilder/blob/master/src/App.tsx).

```
                    <FormMaster id_prefix='my-form-Immutuable'
                        defaultData={FormBuilder.Entity(this.state.immutuableCustomer, this.state.formQuery).data}
                        query={this.state.formQuery}
                        onChange={(key, newValue, index) => {
                            console.log(`Edited ${key}:${index} to ${newValue}`)
                            this.setState({ ...this.state, formQuery: this.state.formQuery.then(Func(q => q.Assign(key, newValue))) })
                        }}
                    />
```


## Methods 

- Select: Is used to add fields to the form everything in the Select will be added to the form 
- UnSelect: This is to undo a select, usefull when you want to add a checkbox next to your form with optional fields. 
- Children: Is used when you want to select fields from a nested form. For example a customer can have a list of pets 
- ChildrenObject: You allready can select fields from a nested list, but sometimes the type is just `object` and not `object[]`. Use this method for non-array types.
- Assign: With this method you can change the value of the form data with the query, in case you have Immutuable data you can let the query keep track of all changes and get the final output by putting the original data through the query. 
- AssignAny: Does do the same as Assign, but the only difference is that it can change the datatype usefull when you have dropdowns.  


