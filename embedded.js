var msgHandlers = {
    fillInfo: onFillInfo //,
    // pay: onPay
};

function onmessage(e) {
    var data = e.data;
    var origin = e.origin;

    /*if (origin.indexOf("http://localhost") === -1) {
        alert('Запрос пришел с другого домена: ' + origin);
        return;
    }*/

    if (data['type'] === undefined) {
        alert('Некорректное сообщение');
    }

    var f = msgHandlers[data['type']];

    if (f) {
        f(data);
    } else {
        alert('Неверный тип сообщения');
    }
}

function onFillInfo(e) {
    var id = e['customerId'];
    var email = e['customerEmail'];

    if (id) {
        var idLabel = document.getElementById('idLabel');
        idLabel.value = id;
    }

    if (email) {
        var emailLabel = document.getElementById('emailLabel');
        emailLabel.value = email;
    }
}

function onPay(e) {
    window.parent.postMessage(
        { type: 'pay' },
        '*'
    );
}

if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('message', onmessage, false);
} else if (typeof window.attachEvent !== 'undefined') {
    window.attachEvent('onmessage', onmessage);
}