<script setup>
 
    //import ref and onMounted
    import { ref, onMounted } from 'vue';
 
    //import api
    import api from '../../api';
 
    //define state
    const carts = ref([]);
 
    //method fetchDataPosts
    const fetchDataCarts = async () => {
 
        //fetch data 
        await api.get('/api/carts')
 
        .then(response => {
 
            //set response data to state "posts"
            carts.value = response.data.data.data
 
        });
    }
 
    //run hook "onMounted"
    onMounted(() => {
 
        //call method "fetchDataPosts"
        fetchDataCarts();
    });
 
    //method deletePost
    const deleteCart = async (id) => {
 
        //delete post with API
        await api.delete(`/api/carts/${id}`)
        .then(() => {
 
            //call method "fetchDataPosts"
            fetchDataCarts();
        })
 
    };
 
</script>
 
<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'carts.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW CART</router-link>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="carts.length == 0">
                                    <td colspan="4" class="text-center">
                                        <div class="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(post, index) in carts" :key="index">
                                    <td class="text-center">
                                        <img :src="post.image" width="200" class="rounded-3"/>
                                    </td>
                                    <td>{{ post.user_id }}</td>
                                    <td>{{ post.name }}</td>
                                    <td>{{ post.price }}</td>
                                    <td>{{ post.quantity }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'carts.edit', params:{id: post.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                        <button @click.prevent="deleteCart(post.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>