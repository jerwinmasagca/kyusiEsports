(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);

// Function to handle topic selection in report form
function selectOption(option) {
    document.getElementById('selectedTopic').textContent = option;
}

// Function to handle topic selection in report form
function selectOption(option) {
    document.querySelector(".dropdown-toggle").textContent = option;
  }

  // Bad words list (you can expand this list as needed)
const badWords = [
    'fuck', 'shit', 'ass', 'bitch', 'dick', 'pussy', 'cock', 'bastard',
    'damn', 'cunt', 'puta', 'putangina', 'gago', 'tangina', 'bobo', 'tanga',
    'ulol', 'inutil', 'pakyu', 'lintik', 'kupal', 'pakshet', 'leche', 'tarantado'
];

function containsBadWords(text) {
    // Convert text to lowercase for case-insensitive comparison
    const lowerText = text.toLowerCase();
    
    // Check for exact matches and partial matches
    return badWords.some(word => {
        // Create a regular expression that matches the word with word boundaries
        const regex = new RegExp(`\\b${word}\\b|${word}`, 'i');
        return regex.test(lowerText);
    });
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            submitPost();
        });
    }
});

function submitPost() {
    // Get the values of the input fields
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    // Check if title and content are filled
    if (!title || !content) {
        Swal.fire({
            title: 'Required Fields Missing',
            text: 'Please fill out both the title and content fields before submitting.',
            icon: 'warning',
            confirmButtonColor: '#6B0000',
            background: '#ffffff',
            color: '#000000',
            iconColor: '#6B0000'
        });
        return false;
    }

    // Check for bad words in title or content
    if (containsBadWords(title) || containsBadWords(content)) {
        Swal.fire({
            title: 'Inappropriate Content Detected',
            text: 'Please keep the discussion civil and avoid using inappropriate language.',
            icon: 'error',
            confirmButtonColor: '#6B0000',
            background: '#ffffff',
            color: '#000000',
            iconColor: '#6B0000'
        });
        return false;
    }

    // If both fields are filled and no bad words, proceed with the submission
    Swal.fire({
        title: 'Success!',
        text: 'Your post has been submitted successfully.',
        icon: 'success',
        confirmButtonColor: '#6B0000',
        background: '#ffffff',
        color: '#000000'
    }).then((result) => {
        if (result.isConfirmed) {
            // Here you would typically submit the form data to your server
            console.log('Post submitted:', { title, content });
            // Optional: Clear the form
            document.getElementById('postForm').reset();
        }
    });
    return false;
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReport();
        });

        // Set the reported name from hidden field to readonly input
        const hiddenName = document.getElementById('reportNameHidden');
        const reportNameInput = document.getElementById('reportName');
        if (hiddenName && reportNameInput) {
            reportNameInput.value = hiddenName.value;
        }
    }
});

function submitReport() {
    // Get form values
    const topic = document.getElementById('selectedTopic').textContent;
    const reportName = document.getElementById('reportNameHidden')?.value || document.getElementById('reportName').value;
    const content = document.getElementById('postContent').value.trim();

    // Check if topic is selected
    if (topic === 'GENERAL') {
        Swal.fire({
            title: 'Please Select a Topic',
            text: 'Please select a report topic before submitting.',
            icon: 'warning',
            confirmButtonColor: '#6B0000',
            background: '#ffffff',
            color: '#000000',
            iconColor: '#6B0000'
        });
        return false;
    }

    // Show success message
    Swal.fire({
        title: 'Report Submitted',
        text: 'Thank you for helping keep our community safe. We will review your report.',
        icon: 'success',
        confirmButtonColor: '#6B0000',
        background: '#ffffff',
        color: '#000000'
    }).then((result) => {
        if (result.isConfirmed) {
            // Reset form
            document.getElementById('reportForm').reset();
            document.getElementById('selectedTopic').textContent = 'GENERAL';
            
            // Reset the reportName field with the hidden value
            const hiddenName = document.getElementById('reportNameHidden');
            const reportNameInput = document.getElementById('reportName');
            if (hiddenName && reportNameInput) {
                reportNameInput.value = hiddenName.value;
            }
        }
    });
    return false;
}

// REQUIRED LOGIN INPUT
document.querySelectorAll('[data-bs-toggle="modal"]').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      const sourceModal = event.target.closest('.modal');
      if (sourceModal) {
        // Capture input values from the source modal
        const email = sourceModal.querySelector('input[name="email"]')?.value || '';
        const username = sourceModal.querySelector('input[name="username"]')?.value || '';
  
        // Target modal ID
        const targetModalId = toggle.getAttribute('href').replace('#', '');
        const targetModal = document.getElementById(targetModalId);
  
        // Pre-fill inputs in the target modal
        if (targetModal) {
          if (targetModal.querySelector('input[name="email"]')) {
            targetModal.querySelector('input[name="email"]').value = email;
          }
          if (targetModal.querySelector('input[name="username"]')) {
            targetModal.querySelector('input[name="username"]').value = username;
          }
        }
      }
    });
  });
  


  (function () {
    'use strict';
  
    // Fetch all forms
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over forms to prevent submission if invalid
    Array.from(forms).forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();



    // Toggle password visibility for the "New Password" field
    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordField = document.getElementById('newPassword');
        const eyeIcon = document.getElementById('eyeIcon');

        // Toggle the password visibility
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        } else {
            passwordField.type = 'password';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        }
    });

    // Toggle password visibility for the "Confirm Password" field
    document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
        const confirmPasswordField = document.getElementById('confirmPassword');
        const eyeIconConfirm = document.getElementById('eyeIconConfirm');

        // Toggle the password visibility
        if (confirmPasswordField.type === 'password') {
            confirmPasswordField.type = 'text';
            eyeIconConfirm.classList.remove('fa-eye-slash');
            eyeIconConfirm.classList.add('fa-eye');
        } else {
            confirmPasswordField.type = 'password';
            eyeIconConfirm.classList.remove('fa-eye');
            eyeIconConfirm.classList.add('fa-eye-slash');
        }
    });
