/**
 * Created by Ethan on 2016/12/22.
 * 17:15
 *
 */
export const SHOW_LOADING = "showLoading";
export const HIDE_LOADING = "hideLoading";
export function showLoading(tip) {
    return {
        type: SHOW_LOADING,
        payload: tip,
        mate: '显示加载状态'
    }
}
export function hideLoading() {
    return {
        type: HIDE_LOADING,
        payload: null,
        mate: '隐藏加载状态'
    }
}