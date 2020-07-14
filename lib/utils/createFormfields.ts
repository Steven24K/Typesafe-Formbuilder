
import { formTypeSelector } from "./formTypeSelector"
import { FormField } from "../types/FormField"


export let createFormFields = <T>(objs: T[]): FormField[] => {
    return objs.flatMap((obj, index) => Object.entries(obj).map(o => {
        switch (formTypeSelector(o[0], o[1])) {
            case "checkbox":
                return <FormField>{
                    name: o[0],
                    type: 'checkbox',
                    index: index
                }
            case "number":
                return <FormField>{
                    name: o[0],
                    type: 'number',
                    index: index
                }
            case "text":
                return <FormField>{
                    name: o[0],
                    type: 'text',
                    index: index
                }
            case "select":
                return <FormField>{
                    name: o[0],
                    type: 'select',
                    index: index,
                    options: o[1]
                }
            case "primitiveList":
                return <FormField>{
                    name: o[0],
                    type: 'primitiveList',
                    index: index
                }
            case "color":
                return <FormField>{
                    name: o[0],
                    type: 'color',
                    index: index
                }
            case "form":
                return <FormField>{
                    name: o[0],
                    type: 'form',
                    index: index,
                    fields: createFormFields(o[1])
                }
            case "nestedObject":
                return <FormField>{
                    name: o[0],
                    type: 'nestedObject',
                    index: index,
                    fields: createFormFields([o[1]])
                }
            case "nestedList":
                return <FormField>{
                    name: o[0],
                    type: 'nestedList',
                    index: index,
                    lists: o[1]
                }
            case "date":
                return <FormField>{
                    name: o[0],
                    type: 'date',
                    index: index
                }
            case "none":
                return <FormField>{
                    name: o[0],
                    type: 'none',
                    index: index
                }
        }
    }))
}


// export let createFormFields = <a>(objs: a[]): FormField[] => {
//     return objs.flatMap((obj, index) => Object.entries(obj).map(o => {
//         switch (formTypeSelector(o[1])) {
//             case 'checkbox':
//                 return <FormField>{
//                     type: 'checkbox',
//                     label: o[0],
//                     name: o[0],
//                     value: o[1], 
//                     index: index
//                 }
//             case 'number':
//                 return <FormField>{
//                     type: 'number',
//                     label: o[0],
//                     name: o[0],
//                     value: o[1], 
//                     index: index
//                 }
//             case 'text':
//                 return <FormField>{
//                     type: 'text',
//                     label: o[0],
//                     name: o[0],
//                     value: o[1],
//                     index: index
//                 }
//             case 'select':
//                 return <FormField>{
//                     type: 'select',
//                     label: o[0],
//                     name: o[0],
//                     value: o[1][0],
//                     options: o[1], 
//                     index: index
//                 }
//             case 'form':
//                 return <FormField>{
//                     type: 'form',
//                     label: o[0],
//                     name: o[0],
//                     fields: createFormFields(o[1]),
//                     index: index
//                 }
//         }
//     }))
// }