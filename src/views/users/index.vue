<script setup>
 
    //import ref and onMounted
    import { ref, onMounted } from 'vue';
 
    //import api
    import api from '../../api';
 
    //define state
    const users = ref([]);
 
    //method fetchDataPosts
    const fetchDataUsers = async () => {
 
        //fetch data 
        await api.get('/api/users')
 
        .then(response => {
 
            //set response data to state "posts"
            users.value = response.data.data.data
 
        });
    }
 
    //run hook "onMounted"
    onMounted(() => {
 
        //call method "fetchDataPosts"
        fetchDataUsers();
    });
 
    //method deletePost
    const deleteUser = async (id) => {
 
        //delete post with API
        await api.delete(`/api/users/${id}`)
        .then(() => {
 
            //call method "fetchDataPosts"
            fetchDataUsers();
        })
 
    };
 
</script>
 
<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'users.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW USER</router-link>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">User Type</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="users.length == 0">
                                    <td colspan="4" class="text-center">
                                        <div class="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(post, index) in users" :key="index">
                                    <td>{{ post.name }}</td>
                                    <td>{{ post.email }}</td>
                                    <td>{{ post.password }}</td>
                                    <td>{{ post.user_type }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'users.edit', params:{id: post.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                        <button @click.prevent="deleteUser(post.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
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