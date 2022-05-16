const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

$(function(){
    $(document).on('click', '#employeeAdd', function(){
        localStorage.clear();
    });
})

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @return {boolean} 유효성 검사 결과
 */
var dateValidation = function (date) {
    let regex = RegExp(/^\d{4}(0[1-9]|1[012])$/);  // ex) 202201
    if(date.length == 8){
        regex = RegExp(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/); // ex) 20220101
    }
    return regex.test(date);
}

var isValidDateFormatYYYYMM = function(date){
    let regex = RegExp(/^\d{4}(0[1-9]|1[012])$/);
    return regex.test(date);
}

var isValidDateFormatYYYYMMDD = function(date){
    regex = RegExp(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/);
    return regex.test(date);
}

var isValidTimeFormat = function(time){
    regex = RegExp(/^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/);
    return regex.test(time);
}

/**
 * 페이지 정보 출력
 * @returns seqNo : 일련번호
 * @returns pathname : admin or mobile -> pc화면인지 모바일화면인지 구분
 * @returns mode : 작성인지 수정인지 모드 설정
 */
var getPageInfo = function () {
    let seqNo = new URL(document.location.href).searchParams.get('seqNo');
    let pathname = new URL(document.location.href).pathname.split('/')[1];
    let mode = seqNo != null ? 'M' : 'W';

    let param = {
        seqNo: seqNo,
        pathname: pathname,
        mode: mode
    }

    return param;
}

/**
 * index화면으로 이동
 * @param {string} pathname admin or mobile
 */
var goToIndex = function (pathname) {
    location.href = '/' + pathname + '/index';
}

/**
 * 객체값을 input box에 입력하는 함수
 * @param {object} object 서버에서 온 객체
 */
var fillInputValue = function (object) {
    for (let id in object) {
        $('#' + id).val(object[id]);
    }
}