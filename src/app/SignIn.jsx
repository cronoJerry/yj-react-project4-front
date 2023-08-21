import Layout from "../components/Layout";
import LayoutContents from "../components/LayoutContents";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineEnter } from "react-icons/ai";
import ButtonSlide from "../components/ButtonSlide";
import KakaoAsset from "../components/asset/KakaoAsset";
import FacebookAsset from "../components/asset/FacebookAsset";
import NaverAsset from "../components/asset/NaverAsset";
import InstaAsset from "../components/asset/InstaAsset";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { userSignIn } from "../api";
import { useNavigate } from "react-router";

export default function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });
	const navigate = useNavigate();

	const { data, mutate } = useMutation(userSignIn);
	if (data?.ok === "false") {
		console.log("logIn error");
	}
	if (data?.ok === "true") {
		navigate("/");
	}

	const onSubmit = (data) => {
		console.log(data);
		mutate(data);
	};

	return (
		<Layout>
			<LayoutContents>
				<div className='w-full flex justify-center'>
					<div className='w-[400px]'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<h1 className='text-3xl py-4 border-b-2 border-neutral-700'>
								회원정보입력
							</h1>
							{/* 아이디 */}
							<div className='relative w-full border-b border-neutral-300'>
								<input
									{...register("username", {
										required:
											"아이디는 필수 입력항목입니다. ",
										minLength: {
											value: 6,
											message:
												"아이디는 6자이상 입력해야 합니다.",
										},
									})}
									type='text'
									placeholder='회원아이디'
									className='w-full py-8 border-0 focus:outline-none'
								/>
								<div className='absolute right-0 top-[50%] -translate-y-[50%]'>
									<BsFillPersonFill />
								</div>
							</div>
							{/* 아이디 에러발생 */}
							<div className='text-red-500 text-sm'>
								{errors?.username?.message}
							</div>
							{/* 패스워드 */}
							<div className='relative w-full border-b border-neutral-300'>
								<input
									{...register("password", {
										required:
											"패스워드는 필수 입력항목입니다.",
									})}
									type='password'
									placeholder='비밀번호'
									className='w-full py-8 border-0 focus:outline-none'
								/>
								<div className='absolute right-0 top-[50%] -translate-y-[50%]'>
									<AiOutlineEnter />
								</div>
							</div>
							{/* 패스워드 에러발생 */}
							<div className='text-red-500 text-sm'>
								{errors?.password?.message}
							</div>
							{/* 버튼 */}
							<div className='w-full py-8'>
								<ButtonSlide text='login' pHeight='py-4' />
							</div>
						</form>
						{/* 구분선 */}
						<div className='relative w-full justify-center flex h-[1px] bg-neutral-300'>
							<div className='absolute -top-3 bg-white  px-2'>
								Or Login With
							</div>
						</div>
						{/* 회원가입, 아이디찾기, 비밀번호찾기 */}
						<div className='flex justify-center w-full space-x-3 my-8'>
							<div>
								<KakaoAsset />
							</div>
							<div>
								<FacebookAsset />
							</div>
							<div>
								<NaverAsset />
							</div>
							<div>
								<InstaAsset />
							</div>
						</div>
					</div>
				</div>
			</LayoutContents>
		</Layout>
	);
}
