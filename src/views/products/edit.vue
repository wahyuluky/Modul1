<script setup>
    //import ref
    import { ref, onMounted } from "vue";
 
    //import router
    import { useRouter, useRoute } from 'vue-router';
 
    //import api
    import api from "../../api";
 
    //init router
    const router = useRouter();
 
    //init route
    const route = useRoute();
 
    //define state
    const image = ref("");
    const name = ref("");
    const price = ref("");
    const errors = ref([]);
 
    //onMounted
    onMounted( async () => {
 
        //fetch detail data post by ID
        await api.get(`/api/products/${route.params.id}`)
        .then(response => {
 
            //set response data to state
            name.value = response.data.data.name
            price.value = response.data.data.price
        });
    })
 
    //method for handle file changes
    const handleFileChange = (e) => {
        //assign file to state
        image.value = e.target.files[0];
    };
 
    //method "updatePost"
    const updateProduct = async () => {
 
        //init formData
        let formData = new FormData();
 
        //assign state value to formData
        formData.append("image", image.value);
        formData.append("name", name.value);
        formData.append("price", price.value);
        formData.append("_method", "PATCH");
 
        //store data with API
        await api.post(`/api/products/${route.params.id}`, formData)
        .then(() => {
            //redirect
            router.push({ path: "/products" });
        })
        .catch((error) => {
            //assign response error data to state "errors"
            errors.value = error.response.data;
        });
    };
</script>
 
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="updateProduct()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" class="form-control" @change="handleFileChange($event)">
                                <div v-if="errors.image" class="alert alert-danger mt-2">
                                    <span>{{ errors.image[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <textarea class="form-control" v-model="name" placeholder="Name"></textarea>
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Price</label>
                                <textarea class="form-control" v-model="price" placeholder="Price"></textarea>
                                <div v-if="errors.price" class="alert alert-danger mt-2">
                                    <span>{{ errors.price[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>