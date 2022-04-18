/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @return {boolean} 유효성 검사 결과
 */
 var dateValidation = function (date) {
    if (isEmpty(date)) {
        return false;
    } else if (isNaN(date)) {
        return false;
    } else if (date.length > 8) {
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, 6) < 0 || date.substring(4, 6) > 12) {
        return false;
    } else if (date.substring(6, 8) < 0 || date.substring(6, 8) > 31) {
        return false;
    }
}

/**
 * 페이지 정보 출력
 * @returns seqNo : 일련번호
 * @returns pathname : admin or mobile -> pc화면인지 모바일화면인지 구분
 * @returns mode : 작성인지 수정인지 모드 설정
 */
var getPageInfo = function(){
    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); 
    let pathname = new URL(document.location.href).pathname.split('/')[1]; 
    let mode = seqNo != null ? 'M' : 'W';                                  

    let param = {
        seqNo : seqNo, 
        pathname : pathname, 
        mode : mode
    }

    return param;
}

var goToIndex = function(pathname){
    location.href = '/' + pathname + '/index';
}