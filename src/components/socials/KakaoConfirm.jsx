import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { GridLoader } from "react-spinners";
import { kakaoLogin } from "../../api";
import { useEffect } from "react";
export default function KakaoConfirm() {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const code = params.get("code");
	const navigate = useNavigate();
	const confirmLogin = async () => {
		if (code) {
			const status = await kakaoLogin(code);
			if (status.ok === "true") {
				navigate("/");
			}
		}
	};
	useEffect(() => {
		confirmLogin();
	});
	return (
		<Layout>
			<div className='w-full min-h-[calc(100vh-360px)] flex flex-col items-center justify-center '>
				<div className='text-3xl'>카카오 로그인 진행중</div>
				<p>잠시만 기다려 주세요</p>
				<div className='py-16'>
					<GridLoader color='#36d7b7' />
				</div>
			</div>
		</Layout>
	);
}
