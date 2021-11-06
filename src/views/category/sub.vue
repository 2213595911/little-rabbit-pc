<template>
    <div class="sub-category">
        <div class="container">
            <SubBread />
            <SubFilter />
        </div>
    </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'

export default {
    name: 'SubCategory',
    components: {
        SubBread,
        SubFilter
    }
}
</script>

<style></style>
