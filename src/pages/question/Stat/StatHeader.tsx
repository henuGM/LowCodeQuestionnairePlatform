import React, { FC, useRef, useMemo, useState, useEffect } from "react";
import {
  Space,
  Button,
  Typography,
  Input,
  Tooltip,
  message,
  Popover,
} from "antd";
import type { InputRef } from "antd";
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import styles from "./StatHeader.module.scss";
import { useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  

  const { title, isPublished } = useGetPageInfo();
  console.log("isPublished",isPublished);
  const [published,setPublished]=useState(isPublished);
  console.log("published",published);
  useEffect(()=>{
    setPublished(isPublished)
  },[isPublished])
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(parseInt(id), {
        isPublished: !published?1:0, 
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success(!published?'发布问卷成功':'取消发布成功')
        setPublished(!published?1:0)
      },
    }
  )

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);
  function copy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中 input 的内容
    document.execCommand("copy"); // 拷贝选中内容 （富文本编辑器的操作）
    message.success("拷贝成功");
  }

 

  const LinkAndQRCodeElem = useMemo(()=>
    {
    if (!published) return null;

    const url = `http://localhost:3000/question/${id}`;

    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space style={{ marginTop: "3px" }}>
        <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  },[published,id])

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} style={{color:"#fff"}} onClick={() => nav(-1)}>
            </Button>
            <Title className={styles.h1}>{title}</Title>
          </Space>
        </div>
        {published?<div className={styles.main}>{LinkAndQRCodeElem}</div>:<></>
        }<div className={styles.right}>
          <Space>
            <Button
              style={{ marginTop: "3px" }}
              type="dashed"
              onClick={pub}
            >
              {published?"取消发布":"发布问卷"}
            </Button>
          <Button
            style={{ marginTop: "3px" }}
            type="primary"
            onClick={() => nav(`/question/edit/${id}`)}
            disabled={published?true:false}
          >
            编辑问卷
          </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
