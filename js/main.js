// ============================
// Splashes - Main JavaScript
// ============================

$(document).ready(function () {
  console.log("main.js loaded successfully");

  loadTestimonials();
  initFaqAccordion();
  initFormValidation();
});

// ============================
// Component 1: Ajax - Load Testimonials (index.html)
// ============================
function loadTestimonials() {
  var $container = $("#testimonials-container");

  if ($container.length === 0) {
    return; // not on this page
  }

  $.ajax({
    url: "data/testimonials.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      $container.empty();
      $.each(data, function (index, item) {
        var card =
          '<div class="testimonial-card">' +
          '<p class="testimonial-quote">"' + item.quote + '"</p>' +
          '<p class="testimonial-name">&mdash; ' + item.name + "</p>" +
          "</div>";
        $container.append(card);
      });
    },
    error: function () {
      $container.html("<p>Unable to load testimonials at this time.</p>");
    }
  });
}

// ============================
// Component 2: jQuery FAQ Accordion (about.html)
// ============================
function initFaqAccordion() {
  $(".faq-question").on("click", function () {
    var $answer = $(this).next(".faq-answer");
    var $allAnswers = $(".faq-answer");
    var $allQuestions = $(".faq-question");

    if ($answer.is(":visible")) {
      $answer.slideUp(200);
      $(this).removeClass("active");
    } else {
      $allAnswers.not($answer).slideUp(200);
      $allQuestions.not(this).removeClass("active");
      $answer.slideDown(200);
      $(this).addClass("active");
    }
  });
}

// ============================
// Form Validation (register modal, contact, register page)
// ============================
function initFormValidation() {
  // Modal register form
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    if (validateForm($(this))) {
      showFormSuccess($(this), "Registration submitted! We'll be in touch soon.");
      setTimeout(function () {
        $("#registerModal").modal("hide");
      }, 1200);
    }
  });

  // Contact page form
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    if (validateForm($(this))) {
      showFormSuccess($(this), "Message sent! We'll get back to you shortly.");
    }
  });

  // Register page form
  $("#registerPageForm").on("submit", function (e) {
    e.preventDefault();
    if (validateForm($(this))) {
      showFormSuccess($(this), "Registration submitted! We'll be in touch soon.");
    }
  });
}

function validateForm($form) {
  var isValid = true;

  $form.find("[required]").each(function () {
    var $field = $(this);
    $field.removeClass("is-invalid");

    if ($field.val() === null || $field.val().trim() === "") {
      $field.addClass("is-invalid");
      isValid = false;
    }

    if ($field.attr("type") === "email" && $field.val().trim() !== "") {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test($field.val().trim())) {
        $field.addClass("is-invalid");
        isValid = false;
      }
    }
  });

  return isValid;
}

function showFormSuccess($form, message) {
  var $existingAlert = $form.siblings(".form-success-alert");
  if ($existingAlert.length) {
    $existingAlert.remove();
  }

  var $alert = $(
    '<div class="alert alert-success form-success-alert mt-3">' + message + "</div>"
  );
  $form.after($alert);
  $form[0].reset();

  setTimeout(function () {
    $alert.fadeOut(400, function () {
      $(this).remove();
    });
  }, 4000);
}