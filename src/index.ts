import type { AnyFieldApi, AnyFieldMeta, VueFormApi } from "@tanstack/vue-form";
import GoatForm from "./GoatForm.vue";
import type { Component } from 'vue'
import { z } from 'zod'

export type AnyVueFormApi = VueFormApi<any, any, any, any, any, any, any, any, any, any>


export interface CommonSchemaItem {
    name: string,
    any: false | undefined
    fieldComponent?: Component
    errorComponent?: Component<{
        meta: AnyFieldMeta
    }>,
    inputComponent: Component<{
        field: AnyFieldApi
    }>,
    labelComponent?: Component,
    validator: z.ZodDefault<z.ZodTypeAny>,
}

export interface SingleInputSchemaItem extends CommonSchemaItem {
    multi?: false | undefined,
    field: {
        label: string,
        meta?: {
            [k: string]: any
        }
    }
}

export interface MultiInputSchemaItem extends CommonSchemaItem {
    multi: true
    fields: Array<{
        label: string,
        meta?: {
            [k: string]: any
        }
    }>
}

export interface AnyComponentItem {
    any: true,
    component: Component,
    props?: { [k: string]: any }
}
export type FormSchemaItem = MultiInputSchemaItem | SingleInputSchemaItem | AnyComponentItem;


export interface FormSchema {
    defaults: {
        errorComponent?: Component<{
            meta: AnyFieldMeta
        }>,
        labelComponent?: Component,
    },
    schema: FormSchemaItem[]
}

export function getFormDefaults(schema: FormSchema): { [k: string]: any } {
    const result: { [k: string]: any } = {}
    schema.schema.filter((i) => {
        return !i.any
    }).forEach((item) => {
        result[item.name] = item.validator._def.defaultValue();
    });
    return result;
} 


export { GoatForm }