var left_PID, right_PID;

function initialize() {
    left_ids = ['l_f', 'l_mp_p', 'l_mp_i', 'l_mp_d', 'l_v_p', 'l_v_i', 'l_v_d'];
    right_ids = ['r_f', 'r_mp_p', 'r_mp_i', 'r_mp_d', 'r_v_p', 'r_v_i', 'r_v_d'];

    left_PID =  [-1, -1, -1, -1, -1, -1, -1];
    right_PID = [-1, -1, -1, -1, -1, -1, -1];
}

function refresh(json) {
    updatePID(json);

    getElement('wheelCirc').innerText = Number(json['wheelCirc']).toFixed(2);

    getElement('leftKf').innerText = Number(json['leftKf']).toFixed(4);
    getElement('rightKf').innerText = Number(json['rightKf']).toFixed(4);

    getElement('leftSpeedScalar').innerText =  Number(json['leftSpeedScalar']).toFixed(4);
    getElement('rightSpeedScalar').innerText =  Number(json['rightSpeedScalar']).toFixed(4);

    getElement('wheelBase').innerText = Number(json['wheelBase']).toFixed(2);
    getElement('leftVelocityError').innerText = Number(json['leftVelocityError']).toFixed(1);
    getElement('rightVelocityError').innerText = Number(json['rightVelocityError']).toFixed(1);
}

function updatePID(json) {
    for (var i = 0; i < 7; i++) {
        if (left_PID[i] != json[left_ids[i]]) {
            left_PID[i] = json[left_ids[i]];
            getElement(left_ids[i]).value = Number(left_PID[i]).toFixed(4);
        }

        if (right_PID[i] != json[right_ids[i]]) {
            right_PID[i] = json[right_ids[i]];
            getElement(right_ids[i]).value = Number(right_PID[i]).toFixed(4);
        }
    }
}

function pushLeftPID() {
    sendNum('leftPID', getPIDConstants(left_ids));
}

function pushRightPID() {
    sendNum('rightPID', getPIDConstants(right_ids));
}

function getPIDConstants(field_ids) {
    var data = "";

    for (var i = 0; i < field_ids.length; i++) {
        data += getElement(field_ids[i]).value;

        if (i != field_ids.length - 1) {
            data += ',';
        }
    }

    return data;
}