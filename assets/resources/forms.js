let formsRegular = document.querySelectorAll('.form__box');

formsRegular.forEach(function (form) {

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let name = form.querySelector('#user-name');
        let phone = form.querySelector('#user-phone');
        let acceptance = form.querySelector('[name="acceptance"]');

        if (name.value === '') {
            alert('Заполните поле с именем');
            return false;
        }

        if (phone.value === '') {
            alert('Заполните поле с номером телефона');
            return false;
        }

        if (!acceptance.checked) {
            alert('Необходимо согласие на обработку персональных данных');
            return false;
        }


        var form_data = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${CURRENT_DOMAIN}/wp-content/themes/autodv/send.php`, true);
        xhr.send(form_data);
        xhr.onload = function () {
            if (xhr.status == 200) {
                form.reset();

                if (form.parentElement.parentElement.parentElement.parentElement.classList.contains('modal--active')) {
                    form.parentElement.parentElement.parentElement.parentElement.classList.remove('modal--active');
                    document.querySelector('body').style = '';
                }
                alert('Ваше сообщение успешно отправлено.');
            }
            else {

                alert('Ошибка при отправке сообщения. Попробуйте позже');
            }
        };
    })


})