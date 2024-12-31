<script setup>

</script>
<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5" style="border-radius: 5px;">
            <h1 class="display-5 fw-bold">RumahBuku.</h1>
            <p class="col-md-8 fs-4">Membuka Halaman, Menemukan Dunia Baru</p>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            Quote
        </div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>Buku memungkinkan kita untuk hidup lebih dari satu kehidupan, menjelajahi dunia, bahkan melintasi waktu.</p>
                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Neil Gaiman</cite></footer>
            </blockquote>
        </div>
    </div>

    <div class="featured">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Menambah Pengetahuan</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Membaca sebagai jendela dunia</h6>
                <p class="card-text">Membaca buku memperkaya wawasan dan meningkatkan pengetahuan tentang berbagai topik, mulai dari sejarah hingga teknologi terkini</p>
                <a href="#" class="card-link">Selengkapnya</a>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Meningkatkan Kemampuan Berpikir</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Latihan untuk otak</h6>
                <p class="card-text">Membaca buku dapat melatih otak untuk berpikir kritis, membuat keputusan yang lebih baik, dan memperbaiki keterampilan analitis</p>
                <a href="#" class="card-link">Selengkapnya</a>
            </div>
        </div>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Mengurangi Stres</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Melarikan diri sejenak dari kenyataan</h6>
                <p class="card-text">Buku fiksi memberikan kesempatan untuk melarikan diri ke dunia lain, mengurangi kecemasan, dan membantu relaksasi mental</p>
                <a href="#" class="card-link">Selengkapnya</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background-color: #FBF6E9;
}

.featured {
    padding: 20px 20px 20px 20px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 40px;
}

</style>
