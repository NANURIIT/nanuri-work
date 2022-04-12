/** equipment_add **/
'use strict';

/** onload **/
$(function() {
    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let uri = new URL(document.location.href).pathname;
    let pathname = uri.split('/')[1];
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    if (mode == 'M') {
        getAwardDetail(seqNo);
    }
 
// 등록 버튼 클릭
$(document).on('click', '#save', function() {
    let param = {
        modlNm : $('#modlNm').val(),
        srlNo : $('#srlNo').val(),
        pyDt : $('#pyDt').val(),
    }
})    

// 취소 버튼 클릭
$(document).on('click', '.cancel_button', function() {
    if(uri.includes('admin') > -1){
        location.href = '/admin/index';
    } else if(uri.includes('mobile') > -1){
        location.href = '/mobile/index';
    }
})

/**
 * 장비 정보 등록
 * @param {string} params.modlNm 모델명
 * @param {string} params.srlNo 시리얼번호
 * @param {string} params.pyDt 지급일자
 */
var registerEquipmentInfo = function() {
    if(isEmpty(params.modlNm)){
        openPopup({
            title : '실패',
            text : '모델명을 입력해주세요.',
            type : 'error',
            callback: function() {
                $(document).on('click', '.confirm', function()   {
                    $('#modlNm').focus();
                });
            }
        })
    }
}
});