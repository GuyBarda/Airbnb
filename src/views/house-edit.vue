<template>
  <section class="secondary-container">
    <section class="house-edit">
      <nav>
        <ul>
          <li><plus-icon style="width: 24px;height: 24px"/>Add Stay</li>
          <li><img src="../assets/svg/stay-at-home.png" />My Stays</li>
          <li><img src="../assets/svg/check-list.png" />Orders</li>
          <li><star-icon style="width: 24px;height: 24px"/>Rates</li>
        </ul>
      </nav>
      <section class="edit-section">
        <section class="house-data">
          <div>Total Rate <span>0</span></div>
          <div>Monthly Earning <span>0</span></div>
          <div>Orders <span>0</span></div>
          <div>Active Guests <span>0</span></div>
        </section>
        <section class="house-info">
            <section class="house-name">
                <h2>Stay name</h2>
                <div>
                <p><star-icon style="display: inline;" /> New (0 Reviews)</p>
                <p>Adress <input type="text"></p>
                </div>
            </section>
            <section class="imgs-container">
              <upload-img v-for="x in 5" :key="x" :idx="x"/>
            </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import starIcon from '../assets/svg/star.vue'
import plusIcon from '../assets/svg/plus.vue'
import uploadImg from '../cmps/upload-img.vue'
export default {

components:{
  starIcon,
  plusIcon,
  uploadImg
}
}
</script>