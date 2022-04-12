/** mobile notice **/
'use strict';

/** onload **/
$(function () {
    let seqNo = new URL(document.location.href).searchParams.get('seqNo');

    getBoardDetail(seqNo);

    // 수정버튼 클릭
    $(document).on('click', '#modifyBoard', function () {
        location.href = '/mobile/noticeWrite?seqNo=' + seqNo;
    });

    // 삭제버튼 클릭
    $(document).on('click', '#deleteBoard', function () {
        confirmDelete(seqNo);
    })
});

/**
 * 게시글 상세내용 호출
 * @param {Number} seqNo 일련번호
 */
var getBoardDetail = function (seqNo) {
    ajaxCall({
        method: 'GET',
        url: '/admin/boardDetail/' + seqNo,
        success: function (object) {
            let BOARD_DETAIL_HTML = '';

            BOARD_DETAIL_HTML += '<div class="notice_title">' + object.bultTitlNm + '</div>';
            BOARD_DETAIL_HTML += '<div class="notice_desc">';
            BOARD_DETAIL_HTML += '<span>' + object.rgmnNm + '</span><span>' + object.rgDtm + '</span>';
            BOARD_DETAIL_HTML += '</div>';
            BOARD_DETAIL_HTML += '<div class="notice_detail_contents">' + object.brcn + '</div>';

            $('.notice_detail_box').html(BOARD_DETAIL_HTML);
        }
    });
}

/**
 * 게시글 삭제 확인팝업 함수
 * @param {Number} seqNo 게시글 번호
 */
var confirmDelete = function (seqNo) {
    openPopup({
        title: '삭제',
        text: '정말 삭제하시겠습니까?',
        type: 'warning',
        callback: function () {
            $(document).on('click', '.confirm', function () {
                deleteBoard(seqNo)
            });
        }
    });
}

/**
 * 게시글 삭제 함수
 * @param {Number} seqNo 게시글 번호
 */
var deleteBoard = function(seqNo){
    ajaxCall({
        method : 'DELETE', 
        url : '/admin/boardDelete', 
        data : {seqNo : seqNo}, 
        success : deleteBoardCB
    });
}

/**
 * deleteBoard 콜백 함수
 */
 var deleteBoardCB = function(){
    openPopup({
        title : '성공', 
        text : '삭제완료했습니다.', 
        type : 'success', 
        callback : function(){
            $(document).on('click', '.confirm', function(){
                history.go(-1);
            });
        }
    });
}