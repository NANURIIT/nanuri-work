const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @return {boolean} 유효성 검사 결과
 */
var dateValidation = function (date) {
    let regex = RegExp(/^\d{4}(0[1-9]|1[012])$/);  // ex) 202201
    return regex.test(date);
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

var goToIndex = function (pathname) {
    location.href = '/' + pathname + '/index';
}