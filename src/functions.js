import { notification } from 'antd';

const handleError = (error) => {
  const { data } = error.response;
  // 捕獲到錯誤時彈出錯誤通知提醒框
  if (!data?.success) {
    notification.error({
      placement: 'top',
      message: '錯誤',
      description: data.message
    });
  } else {
    console.log(data);
  }
}

export { handleError };