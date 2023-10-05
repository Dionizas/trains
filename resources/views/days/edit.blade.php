@extends('layouts.admin')

@section('content')

    <div class="container mt-5">

        <div class="row">
            <div class="col-lg-12 margin-tb">
                <div class="float-end">
                    <a class="btn btn-warning" href="{{ route('days.index') }}" enctype="multipart/form-data">Back</a>
                </div>
            </div>
        </div>

        @if(session('status'))
        <div class="alert alert-success mb-1 mt-1">
            {{ session('status') }}
        </div>
        @endif

        <form action="{{ route('days.update',$day->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <div class="form-group">

                        @php
                        $tmp = explode(" ", $day->show_from);
                        @endphp

                        <label class="form-label fw-bold">Rodome nuo:</label>
                        <input type="text" name="show_from" value="{{ $tmp['0'] }}" class="form-control pasirink-diena" placeholder="Data">
                        @error('show_from')
                        <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <div class="form-group">
                        <label class="form-label fw-bold">Paveiksliukas:</label>
                        <select name="image" class="form-select">
                            <option value="">Pasirinkite paveiksliuką</option>
                            @foreach ($files as $file)
                            <option value="{{ $file->getRelativePathname() }}" {{ $day->image == $file->getRelativePathname() ? 'selected' : '' }}>{{ $file->getRelativePathname() }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <div class="form-group">
                        <label class="form-label fw-bold">Pavadinimas LT:</label>
                        <input type="text" name="name_lt" value="{{ $day->name_lt }}" class="form-control" placeholder="Pavadinimas">
                        @error('name_lt')
                        <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <div class="form-group">
                        <label class="form-label fw-bold">Pavadinimas EN:</label>
                        <input type="text" name="name_en" class="form-control" placeholder="Pavadinimas" value="{{ $day->name_en }}">
                        @error('name_en')
                        <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <div class="form-group">
                        <label class="form-label fw-bold">Tekstas LT:</label>
                        <textarea name="text_lt" class="form-control editor">{{ $day->text_lt }}</textarea>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <div class="form-group">
                        <label class="form-label fw-bold">Tekstas EN:</label>
                        <textarea name="text_en" class="form-control editor">{{ $day->text_en }}</textarea>
                    </div>
                </div>


                <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                    <button type="submit" class="btn btn-primary">Išsaugoti</button>
                </div>

            </div>
        </form>

    </div>

@endsection