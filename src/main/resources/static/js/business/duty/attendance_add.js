/** attendance_add **/
'use strict';

/** onload **/
$(function(){

    getCommonCode();
    getDutyDetail();

    /* start 근태유형에 따라 사유 input box 추가 & 버튼 형태 변경 */ 
    $(document).on('change', '#dutyTypeList', function(){
        if($(this).find('option:selected').attr('class') == 'ON_DUTY'){
            let BUTTON_HTML = '';

            BUTTON_HTML += '<button id="attendance">출근</button>';
            BUTTON_HTML += '<button id="leaveWork">퇴근</button>';
            BUTTON_HTML += '<button class="cancel_button">취소</button>';

            $('#reason').remove();
            $('.join_agree_button').html(BUTTON_HTML);

        } else if($(this).find('option:selected').attr('class') == 'OFF_DUTY'){
            let REASON_HTML = '';
            let BUTTON_HTML = '';

            REASON_HTML += '<div id="reason" class="attendance_list">';
            REASON_HTML += '    <div class="attendance_title">사유</div>';
            REASON_HTML += '    <div class="attendance_box attendance_reason">';
            REASON_HTML += '        <input id="rsnTxt" type="text" placeholder="사유 입력">';
            REASON_HTML += '    </div>';
            REASON_HTML += '</div>';

            BUTTON_HTML += '<button id="confirm">상신</button>';
            BUTTON_HTML += '<button class="cancel_button">취소</button>';

            if(isEmpty($('#reason'))){
                $('.join_detail_wrap > form > :nth-child(2)').after(REASON_HTML);
            }
            $('.join_agree_button').html(BUTTON_HTML);
        }
    });
    /* end 근태유형에 따라 사유 input box 추가 & 버튼 형태 변경 */ 

    /* start 시작일시, 종료일시를 현재시간으로 세팅 */ 
    let date = new Date();
    let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
    let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
    
    $('#stDt').val(today);
    $('#edDt').val(today);
    $('#stTm').val(time);
    $('#edTm').val(time);
    /* end 시작일시, 종료일시를 현재시간으로 세팅 */ 

    // 출근버튼 클릭
    $(document).on('click', '#attendance', function(){
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
        let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

        let params = {
            svceFormCd : $('#dutyTypeList').val(), 
            svcePrjtTxt : $('#svcePrjtTxt').val(), 
            stDt : $('#stDt').val(), 
            stTm : $('#stTm').val(), 
            aawBtnClkDtm : today + ' ' + time
        };

        console.log($('#dutyTypeList').find('option:selected').val());
        //registerOnDuty(params);
    });

    // 퇴근버튼 클릭
    $(document).on('click', '#leaveWork', function(){
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
        let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

        let params = {
            svceFormCd : $('#dutyTypeList').val(),
            edDt : $('#edDt').val(), 
            edTm : $('#edTm').val(), 
            ckofBtnClkDtm : today + ' ' + time
        };

        updateDuty(params);
    });

    // 상신 버튼 클릭
    $(document).on('click', '#confirm', function(){
        let params = {
            svceFormCd : $('#dutyTypeList').val(),
            svcePrjtTxt : $('#svcePrjtTxt').val(), 
            rsnTxt : $('#rsnTxt').val(), 
            stDt : $('#stDt').val(), 
            stTm : $('#stTm').val(), 
            edDt : $('#edDt').val(), 
            edTm : $('#edTm').val()
        }

        console.log($('#dutyTypeList').find('option:selected').val());
    });
});

/**
 * 근태유형 호출
 */
var getCommonCode = function(){
    ajaxCall({
        method : 'GET', 
        url : '/employee/getCommonCode', 
        data : { dsCd : 'DUTY'}, 
        success : function(object){
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option class="'+tmpRow.dtlDsCd+'" value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#dutyTypeList').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 출근버튼 클릭
 * @param {string} params.svceFormCd 근태유형 
 * @param {string} params.svcePrjtTxt 근무프로젝트
 * @param {string} params.stDt 시작일시
 * @param {string} params.stTm 시작시각
 * @param {string} params.aawBtnClkDtm 출근버튼클릭시간
 */
var registerOnDuty = function(params){
    if(isEmpty(params.svcePrjtTxt)){
        openPopup({
            title : '실패', 
            text : '근무프로젝트를 입력해주세요', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function(){
                    $('#svcePrjtTxt').focus();
                });
            }
        });
    } else if(isEmpty(params.stDt)){
        openPopup({
            title : '실패', 
            text : '시작일자를 입력해주세요', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function(){
                    $('#stDt').focus();
                });
            }
        });
    } else if(isEmpty(params.stTm)){
        openPopup({
            title : '실패', 
            text : '시작시각을 입력해주세요', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function(){
                    $('#stTm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/duty/registerOnDuty', 
            data : params, 
            success : function(object){
                if(object){
                    openPopup({
                        title : '성공', 
                        text : '근태 등록을 성공하셨습니다.', 
                        type : 'success', 
                        callback : function(){
                            location.href = '/admin/dutyList';
                        }
                    });
                } else {
                    openPopup({
                        title : '실패', 
                        text : '금일 출근기록이 있습니다.', 
                        type : 'error'
                    });
                }
            }
        })
    }
}

/**
 * 퇴근버튼 클릭
 * @param {string} params.svceFormCd 근태유형
 * @param {string} params.edDt 종료일자
 * @param {string} params.edTm 종료시각
 * @param {string} params.ckofBtnClkDtm 퇴근버튼클릭시간
 */
var updateDuty = function(params){
    console.log(params);
    ajaxCall({
        method : 'PATCH', 
        url : '/duty/updateDuty', 
        data : params, 
        success : function(object){
            if(object){
                openPopup({
                    title : '성공', 
                    text : '근태 등록을 성공하셨습니다.', 
                    type : 'success', 
                    callback : function(){
                        location.href = '/admin/dutyList';
                    }
                });
            } else {
                openPopup({
                    title : '실패', 
                    text : '출근기록이 없습니다.', 
                    type : 'error'
                });
            }
        }, 
        fail : function(){
            console.log(1);
        }
    })
}

var getDutyDetail = function(){
    ajaxCall({
        method : 'GET', 
        url : '/duty/getLastDutyDetail', 
        success : function(object){
            if(isEmpty(object) == false){
                if(isEmpty(object.edDt) && isEmpty(object.edTm)){
                    $('#dutyTypeList').val(object.svceFormCd);
                    $('#svcePrjtTxt').val(object.svcePrjtTxt);
                    $('#stDt').val(object.stDt);
                    $('#stTm').val(object.stTm.substring(0, 5));
                } else {
                    $('#svcePrjtTxt').val(object.svcePrjtTxt);
                }
            }
        }
    })
}