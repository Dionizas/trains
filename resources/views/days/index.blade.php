
@extends('layouts.admin')

@section('content')
    <div class="container mt-5">

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif



        <div class="row">
            @foreach ($days as $day)



                <div class="col-6 col-md-4 col-xl-3 px-3 py-2">
                    <div class="card">


                        @if (!empty($day->name_lt) && !empty($day->text_lt))
                            <div class="card-body text-center" style="background-color:palegreen">
                        @else
                            <div class="card-body text-center">
                        @endif



                        <h1 class="text-center mb-3 font-bold">{{ $day->id }}</h1>

                        <a href="{{ route('days.edit',$day->id) }}" class="btn btn-primary stretched-link mx-auto">Redaguoti</a>
                        </div>
                    </div>
                </div>

            @endforeach
        </div>


    </div>

@endsection

