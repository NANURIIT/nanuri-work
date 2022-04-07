/** skill_add **/
'use strict';

/** onload **/
$(function () {

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    if (mode == 'M') {
        getSkillDetail(seqNo);
    }

    // 저장버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            langFeldNm : $('#langFeldNm').val(), 
            prfcnNm : $('#prfcnNm').val(), 
            etcNm : $('#etcNm').val()
        };

        if (mode == 'W') {
            registerSkill(params);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerSkill(params);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function(){
        location.href = '/employee/index';
    });
});

/**
 * 
 * @param {string} params.langFeldNm 사용가능기술(언어)
 * @param {string} params.prfcnNm 숙련도
 * @param {string} params.etcNm 기타
 * @param {number} params.seqNo 일련번호
 */
var registerSkill = function (params) {
    if (isEmpty(params.langFeldNm)) {
        openPopup({
            title: '실패',
            text: '사용가능기술(언어)를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#langFeldNm').focus();
                });
            }
        });
    } else if (isEmpty(params.prfcnNm)) {
        openPopup({
            title: '실패',
            text: '숙련도를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#prfcnNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method: 'POST',
            url: '/employee/skillWrite',
            data: params,
            success: openPopup({
                title: '성공',
                text: '사용가능기술(언어) 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}

/**
 * 사용가능기술(언어) 상세 조회
 * @param {number} seqNo 일련번호
 */
var getSkillDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/skillDetail/'+seqNo, 
        success : function(object){
            $('#langFeldNm').val(object.langFeldNm);
            $('#prfcnNm').val(object.prfcnNm);
            $('#etcNm').val(object.etcNm);
        }
    });
}