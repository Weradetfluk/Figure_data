<template>
    <div>
        <fgf_navbar></fgf_navbar>

        <div class="container mt-5">

            <div class="d-flex justify-content-end p-5">
                <b-button variant="primary" to="/add_data">เพิ่มข้อมูล</b-button>
            </div>

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อ</th>
                        <th>รายละเอียด</th>
                        <th>ภาพตัวอย่าง</th>
                        <th>ดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data_fig, index) in Data_fig" :key="data_fig.fig_id">
                        <td> {{ index + 1 }}</td>
                        <td> {{ data_fig.fig_name }}</td>
                        <td> {{ data_fig.fig_description }}</td>
                        <td> <img :src='data_fig.fig_picpath' style="width:150px; height:200px;"> </td>
                        <td>
                            <router-link type="button" to="/update_data"
                                class="btn btn-warning m-3">แก้ไข</router-link>
                            <button type="button" class="btn btn-danger" v-b-modal.modal_delete
                                @click="set_data_modal_delete(data_fig.fig_id)">ลบ</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <b-modal id="modal_delete" title="แจ้งเตือน" hide-footer ref="delete_modal">
            <p class="my-4">คุณต้องการลบรายการหรือไม่ ?</p>
            <input type="hidden" v-model="data_param.fig_id_param">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal"
                @click="delete_todolist(data_param.fig_id_param)">ตกลง</button>
        </b-modal>

    </div>
</template>
<style>

</style>
<script>
import axios from "axios";
import fgf_navbar from "@/components/fgf_navbar.vue";
export default {
    name: "figure_list",
    data() {
        return {
            Data_fig: [],
            data_param: {
                fig_id_param: null,
              
            },
        }
    },
    created() {
        let apiURL = "http://localhost:4000/figure_api/show_data";
        axios.get(apiURL).then(res => {
            this.Data_fig = res.data;
            console.log(res.data);
        })
            .catch((error) => {
                console.log(error);
            });
    },
    components: {
        fgf_navbar,

    },
    methods: {
        set_data_modal_delete(id) {
            this.data_param.fig_id_param = id;
        },
        delete_todolist(id) {
            let apiURL = 'http://localhost:4000/figure_api/delete_figure/' + id;
            //find_index to delete
            let index_array = this.Data_fig.findIndex(i => i.fig_id === id);
            axios.delete(apiURL).then( () => {
                this.Data_fig.splice(index_array, 1)
                this.$swal('ลบข้อมูลสำเร็จ');

            }).catch(error => {
                console.log(error)
            })

        },
        //     add_delete_todolist(id) {
        //      let apiURL = 'http://localhost:3000/api/delete_todolist/'+id;
        //      let index_array = this.Test.findIndex(i => i._id === id);

        //     if (window.confirm("คุณต้องการลบรายการที่ต้องทำหรือไม่ ? ")) {
        //         axios.delete(apiURL).then(() => {
        //             this.Test.splice(index_array, 1)
        //         }).catch(error => {
        //             console.log(error)
        //         })
        //         console.log(apiURL + '  ' + id)
        //     }
        // },

        // open_modal_edit__todolist(id, title, detail){
        //      this.data_param.title = title;
        //      this.data_param.detail = detail;
        //      this.data_param.id = id;
        // },
        // edit_todolist(){
        //    let id = this.data_param.id
        //     let apiURL = 'http://localhost:3000/api/update_todolist/'+id;


        //     if (window.confirm("คุณต้องการแก้ไขรายการที่ต้องทำหรือไม่ ? ")) {
        //         axios.put(apiURL, this.data_param).then((res) => {
        //              console.log(res)
        //         }).catch(error => {
        //             console.log(error)
        //         })
        //         console.log(apiURL + '  ' + id)
        //         location.reload();
        //     }
        // }

        // getImgUrl(pic) {
        //     var images = require('http://localhost:4000/' + pic)
        //     return images;
        // }


    },
}

</script>
