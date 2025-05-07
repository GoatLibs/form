import type { AnyFieldApi, AnyFieldMeta, VueFormApi } from "@tanstack/vue-form";
import GoatForm from "./GoatForm.vue";
import type { Component } from 'vue'
import { z } from 'zod'

export type AnyVueFormApi = VueFormApi<any, any, any, any, any, any, any, any, any, any>


export interface CommonSchemaItem {
    name: string,
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
            [k: string]: string
        }
    }
}

export interface MultiInputSchemaItem extends CommonSchemaItem {
    multi: true
    fields: Array<{
        label: string,
        meta?: {
            [k: string]: string
        }
    }>
}


export type FormSchemaItem = MultiInputSchemaItem | SingleInputSchemaItem


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
    schema.schema.forEach((item) => {
        result[item.name] = item.validator._def.defaultValue();
    });
    return result;
} 


export { GoatForm }