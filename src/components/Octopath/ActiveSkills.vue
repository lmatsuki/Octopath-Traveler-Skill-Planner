<template>
    <b-table :data="filteredJobSkills" :hoverable="true" class="table is-fullwidth">
        <template slot-scope="props">
            <b-table-column field="name" label="Skill">
                <b-tooltip type="is-dark" :label="props.row.description">
                    {{ props.row.name }}
                </b-tooltip>
            </b-table-column>
            <b-table-column field="element" label=" ">
                <b-icon v-show="props.row.element != ''" pack="fas" icon="user" size="is-small">
                    {{ props.row.element }}
                </b-icon>
            </b-table-column>
            <b-table-column field="sp" label="SP">
                {{ props.row.sp }}
            </b-table-column>
            <b-table-column field="" label="">
                <b-checkbox type="is-success"></b-checkbox>
            </b-table-column>
        </template>
    </b-table>
</template>

<script>
export default {};
</script>