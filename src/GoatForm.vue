<script setup lang="ts">
import type { AnyVueFormApi, FormSchema } from './index';
defineProps<{
    schema: FormSchema,
    form: AnyVueFormApi
}>()
</script>

<template>
    <template v-for="sf in schema.schema">
        <component :is="sf.fieldComponent ?? 'div'" class="goat_field" v-if="!sf.any">
            <form.Field :name="sf.name" :validators="{
                onChange: sf.validator,
            }">
                <template v-slot="{ field }">
                    <template v-if="!sf.multi">
                        <component :is="sf.labelComponent ?? schema.defaults.labelComponent" :field="field">
                            {{ sf.field.label }}
                        </component>
                        <component :is="sf.inputComponent" :field="field" v-bind="sf.field"></component>
                    </template>
                    <template v-else>
                        <div class="goat_subfield" v-for="{ label, ...args } in sf.fields">
                            <component :is="sf.labelComponent ?? schema.defaults.labelComponent">
                                {{ label }}
                            </component>
                            <component :is="sf.inputComponent" :field="field" v-bind="args"></component>
                        </div>
                    </template>

                    <component :is="sf.errorComponent ?? schema.defaults.errorComponent" :meta="field.state.meta">
                    </component>
                </template>
            </form.Field>
        </component>
        <component v-else :is="sf.component" v-bind="sf.props ?? {}" />
    </template>

</template>