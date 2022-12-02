<template>
  <section class="main-container-edit">
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
                <p>Reviews:</p>
                <p>Adress <input type="text"></p>
                </div>
            </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import starIcon from '../assets/svg/star.vue'
import plusIcon from '../assets/svg/plus.vue'
export default {

components:{
  starIcon,
  plusIcon
}
}
</script>