/** attendance_approve **/
'use strict';

/** onload **/
$(function(){
    let seqNo = new URL(document.location.href).searchParams.get('seqNo');

    getDutyHistoryDetail(seqNo);

    $(document).on('click', '.attendance_btn', function(){
        let params = {
            seqNo : seqNo, 
            dczStsCd : $(this).attr('id')
        }
        
        if($('#dczStsCdnm').attr('class').split(' ')[1] == $(this).attr('id')) {
            openPopup({
                title : '실패', 
                text : '이미 '+$(this).text()+'상태입니다.', 
                type : 'error'
            });
        } else {
            attendance(params);
        }
    });

    $(document).on('click', '.cancel_button', function(){
        history.go(-1);
    });
});

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

var getDutyHistoryDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/duty/getDutyHistoryDetail/' + seqNo, 
        success : function(object){
            $('#empNo').val(object.telNo.substring(3, object.telNo.length));
            $('#userNm').val(object.userNm);
            $('#dtyNm').val(object.dtyNm);
            $('#blgNm').val(object.blgNm);
            $('#basDt').val(object.basDt);
            $('#svceFormCdNm').val(object.svceFormCdNm);

            if(isEmpty(object.sbtAftVctnDys) == false){
                if(object.sbtAftVctnDys % 1 === 0){
                    $('#sbtAftVctnDys').val(object.sbtAftVctnDys.substring(0, object.sbtAftVctnDys.length - 3));
                } else {
                    $('#sbtAftVctnDys').val(object.sbtAftVctnDys.substring(0, object.sbtAftVctnDys.length - 1));
                }
            }

            $('#stDt').val(object.stDt + '('+WEEKDAY[new Date(object.stDt).getDay()]+')');
            $('#stTm').val(object.stTm.substring(0, object.stTm.length - 3));

            if(isEmpty(object.edDt) == false) {
                $('#edDt').val(object.edDt + '('+WEEKDAY[new Date(object.edDt.substring(0, 10)).getDay()]+')');
            }

            if(isEmpty(object.edTm) == false){
                $('#edTm').val(object.edTm.substring(0, object.edTm.length - 3));
            }

            $('#rgDtm').val(object.rgDtm.substring(0, object.rgDtm.length - 3));
            $('#dczStsCdnm').val(object.dczStsCdnm);
            $('#dczStsCdnm').addClass(object.dczStsCd);
            if(isEmpty(object.dczDtm) == false){
                $('#dczDtm').val(object.dczDtm.substring(0, object.dczDtm.length - 3));
            }

            if(isEmpty(object.dczmnNm) == false){
                $('#dczmnNm').val(object.dczmnNm);
            }
        }
    });
}

var attendance = function(params){
    ajaxCall({
        method : 'PATCH', 
        url : '/duty/attendance', 
        data : params, 
        success : function(){
            openPopup({
                title : '성공', 
                type : 'success', 
                success : $(document).on('click', '.confirm', function(){
                    location.href = '/mobile/dutyConfirm';
                })
            });
        }
    });
}