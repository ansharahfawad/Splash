// ============================
// Splashes - Vue Component
// Class Filter Widget (classes.html)
// ============================

var classFilterApp = null;

document.addEventListener("DOMContentLoaded", function () {
  var mountPoint = document.getElementById("vue-class-filter");

  if (!mountPoint) {
    return; // Not on classes.html, skip
  }

  classFilterApp = new Vue({
    el: "#vue-class-filter",
    data: {
      activeFilter: "all",
      classes: [
        {
          id: 1,
          name: "Parent & Toddler",
          ageGroup: "toddler",
          ageLabel: "Ages 6 months - 3 years",
          description: "A gentle introduction to water with a parent in the pool alongside each child.",
          image: "images/placeholder-class1.jpg"
        },
        {
          id: 2,
          name: "Beginner",
          ageGroup: "kids",
          ageLabel: "Ages 4-7",
          description: "Building water confidence, basic floating, and foundational strokes.",
          image: "images/placeholder-class2.jpg"
        },
        {
          id: 3,
          name: "Intermediate",
          ageGroup: "kids",
          ageLabel: "Ages 8-12",
          description: "Refining stroke technique, breathing, and endurance in the water.",
          image: "images/placeholder-class3.jpg"
        },
        {
          id: 4,
          name: "Advanced",
          ageGroup: "teen",
          ageLabel: "Ages 10+",
          description: "Competitive-level technique, speed, and advanced water safety skills.",
          image: "images/placeholder-class4.jpg"
        }
      ]
    },
    computed: {
      filteredClasses: function () {
        if (this.activeFilter === "all") {
          return this.classes;
        }
        return this.classes.filter(function (c) {
          return c.ageGroup === this.activeFilter;
        }, this);
      }
    },
    methods: {
      setFilter: function (group) {
        this.activeFilter = group;
      }
    }
  });
});