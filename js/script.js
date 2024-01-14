$(document).ready(function () {
    $("#registrationForm").submit(function (e) {
        e.preventDefault();
        if (validateRegistrationForm()) {
            $.ajax({
                type: "POST",
                url: "register.php",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function (response) {
                    window.location.href = response;
                }
            });
        }
    });

    $("#loginForm").submit(function (e) {
        e.preventDefault();
        if (validateLoginForm()) {
            $.ajax({
                type: "POST",
                url: "login_process.php",
                data: $(this).serialize(),
                success: function (response) {
                    if (response.trim() === "success") {
                        window.location.href = "dashboard.php";
                    } else {
                        window.location.href = response;
                    }
                }
            });
        }
    });

    $("#fileUploadForm").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "upload_file.php", // Create this PHP file to handle file upload
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                alert(response);
            }
        });
    });

	function checkExistingUser(callback) {
        var username = $("#registrationForm input[name='username']").val();
        var email = $("#registrationForm input[name='email']").val();

        $.ajax({
            type: "POST",
            url: "check_existing_user.php", // Create this PHP file to handle the check
            data: { username: username, email: email },
            success: function (response) {
                callback(response);
            }
        });
    }

    // Form validation functions
    function validateRegistrationForm() {
        var username = $("#registrationForm input[name='username']").val();
        var email = $("#registrationForm input[name='email']").val();
        var password = $("#registrationForm input[name='password']").val();
        var profileImage = $("#registrationForm input[name='profile_image']").val();

        // Simple validation example, you should customize it based on your needs
        if (username === "" || email === "" || password === "" || profileImage === "") {
            alert("All fields are required");
            return false;
        }

        return true;
    }

    function validateLoginForm() {
        var username = $("#loginForm input[name='username']").val();
        var password = $("#loginForm input[name='password']").val();

        // Simple validation example, you should customize it based on your needs
        if (username === "" || password === "") {
            alert("Both username and password are required");
            return false;
        }

        return true;
    }
});
