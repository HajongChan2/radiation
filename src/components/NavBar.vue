<template>
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary col-sm-12">
        <div class="container-fluid col-sm-10">
          <a class="navbar-brand" @click.prevent="handleClick" href="#"><img src="../assets/logo.png" alt="logo"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" @click.prevent="handleClick" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="handleClick" href="#">방사능</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="handleClick" href="#">세슘&삼중수소</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="handleClick" href="#">실시간 댓글</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>   
    </div>
</template>
<script>
export default {
  data() {
    return {
      styles : 'block',
    };
  },
  methods: {
    Button(){
      this.styles = this.styles == '' ? 'block' : 'none'; 
    }
  },
  name: 'NavBar',
  
};
</script>

<style>
.navbar-nav{
  margin-left: 0;
}
</style>