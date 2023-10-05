<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Proweb TVS</title>
    <link rel="stylesheet" href="{{ asset('assets/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,700;1,400&amp;display=swap">
    <link rel="stylesheet" href="{{ asset('assets/trumbowyg/ui/trumbowyg.css?v=1.1') }}">
    <link rel="stylesheet" href="{{ asset('assets/bootstrap-datepicker/css/bootstrap-datepicker.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/proweb/admin.css') }}">
</head>

<body>
    <nav class="navbar navbar-light navbar-expand-md py-3">
        <div class="container"><a class="navbar-brand d-flex align-items-center" href="#">
            <span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100.000000pt" height="26.000000pt" viewBox="0 0 170.000000 40.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#df383e" stroke="none">
                        <path
                            d="M10 206 l0 -156 35 0 35 0 0 121 0 120 43 -3 c39 -3 42 -5 42 -33 0 -25 -4 -30 -27 -33 -25 -3 -28 -8 -28 -39 0 -35 1 -35 32 -29 69 14 105 61 94 122 -11 57 -45 77 -141 82 l-85 5 0 -157z" />
                        <path
                            d="M260 325 l0 -35 70 0 c64 0 71 -2 79 -22 14 -36 -9 -62 -58 -66 -23 -2 -41 -7 -39 -11 2 -4 23 -38 48 -74 42 -62 48 -66 83 -67 20 0 37 3 37 6 0 3 -17 26 -37 51 -25 30 -34 48 -26 50 79 27 83 157 7 189 -19 8 -63 14 -99 14 l-65 0 0 -35z" />
                        <path
                            d="M624 349 c-103 -30 -135 -184 -53 -253 49 -42 100 -52 154 -32 65 25 99 74 99 140 0 64 -29 110 -88 137 -45 20 -65 22 -112 8z m107 -78 c19 -15 24 -29 24 -66 0 -56 -28 -85 -80 -85 -46 0 -75 27 -82 77 -5 35 -2 45 20 67 32 32 84 35 118 7z" />
                        <path
                            d="M850 205 l0 -155 38 0 c32 0 41 5 57 32 l20 33 3 -32 c3 -30 6 -33 36 -33 30 0 38 8 134 149 56 82 102 152 102 155 0 3 -17 6 -39 6 -39 0 -39 -1 -100 -102 l-61 -103 0 95 0 95 -58 -95 -57 -95 -3 103 -3 102 -34 0 -35 0 0 -155z" />
                        <path
                            d="M1270 205 l0 -155 80 0 80 0 0 35 c0 35 0 35 -45 35 -41 0 -45 2 -45 25 0 20 5 25 25 25 22 0 25 4 25 35 0 31 -3 35 -25 35 -20 0 -25 5 -25 25 0 23 4 25 45 25 45 0 45 0 45 35 l0 35 -80 0 -80 0 0 -155z" />
                        <path
                            d="M1450 325 l0 -35 64 0 c63 0 79 -8 69 -37 -3 -9 -26 -13 -69 -13 l-64 0 0 -35 0 -34 73 -3 c64 -3 72 -5 72 -23 0 -18 -8 -20 -72 -23 l-73 -3 0 -34 0 -35 65 0 c80 0 132 20 145 55 16 41 12 64 -15 89 -22 21 -23 25 -10 36 17 14 20 62 5 90 -13 25 -62 40 -131 40 l-59 0 0 -35z" />
                    </g>
                </svg>

            </span>
        </a>
    
    <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-2">
        <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-2">
                <ul class="navbar-nav ms-auto">
                </ul>
                

                <form action="{{ route('logout') }}" method="POST">
                    @csrf

                    <button class="btn btn-primary ms-md-2" role="button">Logout</button>
                </form>


            </div>
        </div>
    </nav>
    <div class="container mt-5 mb-5">

        @yield('content')

    </div>


    <script type="text/javascript" src="{{ asset('assets/jquery/jquery-3.6.1.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/jquery-ui/jquery-ui.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/trumbowyg/trumbowyg.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/trumbowyg/plugins/allowtagsfrompaste/trumbowyg.allowtagsfrompaste.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/bootstrap-datepicker/locales/bootstrap-datepicker.lt.min.js') }}"></script>
    
    <script type="text/javascript" src="{{ asset('assets/proweb/proweb-admin.js') }}"></script>


</body>

</html>