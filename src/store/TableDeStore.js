import { observable, action, computed } from 'mobx'

export default class TableDeStore
{
    @observable
    loading = false

    @action
    startLoad() {
        this.loading = true
    }

    @action
    endLoad() {
        this.loading = false
    }

}
