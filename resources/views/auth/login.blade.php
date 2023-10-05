@extends('layouts.login')

@section('title', 'Login Page')

@section('content')

			<!-- BEGIN login-content -->
			<div class="login-content">
				<form action="{{ route('login') }}" method="POST" class="fs-13px">
					@csrf

					@if ($errors->any())
					<div class="alert alert-danger">
						<ul>
							@foreach ($errors->all() as $error)
								<li>{{ $error }}</li>
							@endforeach
						</ul>
					</div>
					@endif


					<div class="form-floating mb-15px">
						<input type="text" class="form-control h-45px fs-13px" placeholder="Email Address" id="email" name="email" />
						<label for="email" class="d-flex align-items-center fs-13px text-gray-600">Email Address</label>
					</div>


					<div class="form-floating mb-15px">
						<input type="password" class="form-control h-45px fs-13px" placeholder="Password" id="password" name="password" />
						<label for="password" class="d-flex align-items-center fs-13px text-gray-600">Password</label>
					</div>
					<div class="form-check mb-30px">
						<input class="form-check-input" type="checkbox" value="1" id="remember" name="remember" />
						<label class="form-check-label" for="remember">
							Remember Me
						</label>
					</div>
					<div class="mb-15px">
						<button type="submit" class="btn btn-success d-block h-45px w-100 btn-lg fs-14px">Sign me in</button>
					</div>
					<div class="mb-40px pb-40px text-dark">

					</div>
					<hr class="bg-gray-600 opacity-2" />
					<div class="text-gray-600 text-center text-gray-500-darker mb-0">
						&copy; UAB "Informacijos linija" {{ date('Y') }}
					</div>
				</form>
			</div>
			<!-- END login-content -->

@endsection
