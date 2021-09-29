<template>
  <header>
    <Navbar />
  </header>
  <div class=" container-fluid backlog">
    <div class="row">
      <div class="col-md-2 bg-white viewport shadow">
        <div class="space pt-5">
          <h1 class="text-center">
            Project
          </h1>
          <div class="backlogs">
            <div class="text-center t-color">
              <router-link :to="{name:'Projects.Backlog'}" class="t-color">
                <h5 class="nav-link t-color">
                  BackLogs
                </h5>
              </router-link>
            </div>
            <div class="text-center">
              <router-link :to="{name:'Projects.Sprint'}" class="text-success lighten-30">
                <h5 class="nav-link t-color">
                  Sprints
                </h5>
              </router-link>
            </div>
          </div>
        <!-- navigation icons go here -->
        </div>
      </div>
      <div class="col-md-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.viewport{
  height: 100vh;
}
.t-color{
  color: #CF40AE;
}
</style>
